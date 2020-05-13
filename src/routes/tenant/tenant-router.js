const express = require('express')
const TenantController = require('../../controllers/tenant/tenant-controller')
const Auth = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.get('/bylandlord/:id', TenantController.getByLandlord)
router.post('/', Auth.createTenantUser, TenantController.createTenant)
router.get('/byunit/:id', TenantController.getByUnit)

module.exports = router
