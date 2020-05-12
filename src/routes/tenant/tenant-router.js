const express = require('express')
const TenantController = require('../../controllers/tenant/tenant-controller')

const router = express.Router()

router.get('/bylandlord/:id', TenantController.getByLandlord)

module.exports = router