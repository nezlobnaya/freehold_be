const express = require('express')
const TenantController = require('../../controllers/tenant/tenant-controller')
const Auth = require('../../controllers/auth/auth-controller')
const User = require('../../controllers/user/user-controller');

const router = express.Router()

router.get('/bylandlord', TenantController.getByLandlord)
router.post('/', Auth.createTenantUser, TenantController.createTenant, User.connectTenantToUnit)
router.get('/byunit/:id', TenantController.getByUnit)

module.exports = router
