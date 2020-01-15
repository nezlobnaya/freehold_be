const express = require('express')
const WOController = require('../../controllers/workorders')
const bearerAuth = require('../../lib/bearer-auth')
const requireAuth = require('../../lib/require-auth')
const {requireLandlord} = require('../../middleware')

const Workorders = require('../../models/workorders')

const router = express.Router()

router.use(bearerAuth, requireAuth)

const validateInput = getErrors => (req, res, next) => {
  const errors = getErrors(req.body)

  if (Object.keys(errors).length > 0) {
    res.status(400).json({errors})
  } else {
    next()
  }
}

//#region - READ
// GET all properties
router.get('/', requireLandlord, PropertyController.getAllByUser)
//#endregion


module.exports = router