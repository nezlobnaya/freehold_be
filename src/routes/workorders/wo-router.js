const express = require('express')
const WOController = require('../../controllers/workorders/workorders-controller.js')
// const Workorder = require('../../models/workorders')

// const Property = require('../../models/property')

// const requireAuth = require('../../lib/require-auth')

const router = express.Router()

// const checkAccessToWorkorder = async (req, res, next) => {
//   const id = req.workorder.property.id

//   if (req.user.type === 'tenant' && req.user.residenceId !== id) {
//     return res
//       .status(401)
//       .json('You are not authorized to access that work order')
//   }

//   try {
//     const property = await Property.getProperty(id)
//     console.log('PROPERTY', property)

//     if (req.user.type === 'landlord' && req.user.id !== property.landlordId) {
//       console.log('USER', req.user.id === property.landlordId)
//       return res
//         .status(401)
//         .json('You are not authorized to access that work order')
//     }

//     next()
//   } catch (err) {
//     console.error(err)

//     res.status(500).send('Internal Server Error')
//   }
// }

// const requirePropertyId = (req, res, next) => {
//   if (!req.property.id) {
//     return res.status(400).json({message: 'property id is required'})
//   }

//   next()
// }

// const putPropertyid = (req, res, next) => {
//   if (req.user.type === 'landlord') {
//     req.property = {id: req.body.propertyId}
//   } else {
//     req.property = {id: req.user.residenceId}
//   }

//   if (!req.property.id) {
//     return res.status(500).send('help')
//   }

//   next()
// }

// const validateById = async (req, res, next) => {
//   const {id} = req.params

//   try {
//     const workorder = await Workorder.getById(id)

//     if (!workorder) {
//       res.status(404).json({message: 'No workorder found with that id.'})
//     } else {
//       /* eslint-disable-next-line */
//       req.workorder = workorder
//       next()
//     }
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({message: 'Internal server error'})
//   }
// }

router.post(
  '/',
  // putPropertyid,
  // requirePropertyId,
  WOController.create,
)

// GET all workorders - based off the user who is logged in
// router.get('/', WOController.readAllByUser)

// GET workorder by id
router.get(
  '/:id',
  // validateById,
  // putPropertyid,
  // checkAccessToWorkorder,
  WOController.readById,
)

router.get(
  '/',
  // validateById,
  // putPropertyid,
  // checkAccessToWorkorder,
  WOController.readAllByUser,
)

router.put(
  '/:id',
  // validateById,
  // checkAccessToWorkorder,
  WOController.updateById,
)

// router.delete('/:id', validateById, checkAccessToWorkorder, WOController.remove)

module.exports = router
