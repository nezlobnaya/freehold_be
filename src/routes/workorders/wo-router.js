const express = require('express')
const WOController = require('../../controllers/workorders/workorders.js')
const bearerAuth = require('../../lib/bearer-auth')
const requireAuth = require('../../lib/require-auth')

const Workorders = require('../../models/workorders')

const router = express.Router()

router.use(bearerAuth, requireAuth)

//#region - READ

  // GET all workorders - based off the user who is logged in
  router.get('/', WOController.readAllByUser)

  // GET workorder by id
  router.get('/:id', WOController.readById)

//#endregion


module.exports = router