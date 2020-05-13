const express = require('express')
const TenantController = require('../../controllers/tenant/tenant-controller')

const router = express.Router()

router.get('/bylandlord/:id', TenantController.getByLandlord)
router.get('/byunit/:id', TenantController.getByUnit)

module.exports = router
