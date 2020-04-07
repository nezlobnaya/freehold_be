const express = require('express')
const Property = require('../../models/property')
const User = require('../../models/user')
const sgMail = require('@sendgrid/mail')
const bearerAuth = require('../../lib/bearer-auth')
const requireAuth = require('../../lib/require-auth')
const {requireLandlord} = require('../../middleware')

const router = express.Router()

router.use(bearerAuth, requireAuth)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const canAddTenant = (req, res, next) => {
  // Sets the default user to an empty object to avoid `property is not a valid
  // key on undefined`
  const {user = {}} = req

  if (user.type === 'landlord') {
    next()
  } else {
    res
      .status(401)
      .json({message: 'Only landlords are authorized to create tenants'})
  }
}

// create tenant
router.post('/', canAddTenant, async (req, res) => {
  try {
    /* Start potential middleware */
    const property = await Property.getProperty(req.body.residenceId)

    if (property.landlordId !== req.user.id) {
      return res.status(401).json({
        message:
          'Not authorized to create association with another landlords property',
      })
    }

    await Property.updateProperty({status: 'occupied'}, req.body.residenceId)

    /* end potential middleware */

    const tenant = await User.createTenant({
      ...req.body,
      email: req.body.email,
      landlordId: req.user.id,
      type: 'tenant',
    })

    if (tenant) {

      const msg = {
        to: req.body.email,
        from: 'labspt.propman@gmail.com',
        subject: 'You have been added to a property!',
        text: `You have been added to  property.Please go to freehold.com to register!`,
        html: `Welcome ${req.body.firstName} ${req.body.lastName}, <br />We are glad you joined the Freehold family!<br /><strong> Please go to freehold.dev to register! Sincerely, FreeHold team </strong`,
      }
  
      sgMail.send(msg).then(() => {}, console.error)

      return res.status(201).json(tenant)
    } else {
      res.status(400).json({message: 'Something unexpected happened'})
    }
  } catch (err) {
    console.error(err)

    return res.status(500).json({message: 'Something unexpected happened'})
  }
})

// get all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await User.getAllTenantsByLandlordId(req.user.id)

    if (tenants) {
      res.status(200).json(tenants)
    } else {
      res.status(500).json({message: 'Internal Server error'})
    }
  } catch (err) {
    console.error(err)

    return res.status(500).json({message: 'Internal Server Error'})
  }
})

// get tenant by id
router.get('/:id', requireLandlord, async (req, res) => {
  const {id} = req.params

  try {
    const user = await User.findTenantById(id)

    if (user.landlordId !== req.user.id) {
      return res.sendStatus(401)
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err)

    return res.status(500).json({message: 'Internal server error'})
  }
})

// must be placed after bearerAuth, requireAuth
const canAccessTenant = msg => async (req, res, next) => {
  const {id} = req.params

  if (!id) {
    return res.status(400).json({message: 'Expected tenant id'})
  }

  try {
    const hasPermission = await User.canAccessTenant(req.user.id, id)

    if (hasPermission) {
      next()
    } else {
      return res.status(401).json({message: msg})
    }
  } catch (err) {
    console.log(err)

    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const validateTenantUpdate = (req, res, next) => {
  const input = req.body

  let errors = {}

  // eslint-disable-next-line
  if (input.hasOwnProperty('email')) {
    errors.email = 'The email field is not editable at this time'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({errors})
  }

  next()
}

router.put(
  '/:id',
  requireLandlord,
  canAccessTenant('You are not authorized to edit that tenant'),
  validateTenantUpdate,
  async (req, res) => {
    try {
      const {updated, user} = await User.updateTenantById(
        req.params.id,
        req.body,
      )

      if (updated) {
        return res.status(200).json(user)
      } else {
        return res.status(500).json({message: 'Internal Server Error'})
      }
    } catch (err) {
      console.error(err)

      res.status(500).json({message: 'Internal Server Eerror'})
    }
  },
)

module.exports = router
