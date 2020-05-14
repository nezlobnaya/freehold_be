const express = require('express')
const Tenant = require('../../controllers/tenant/tenant-controller')
const Auth = require('../../controllers/auth/auth-controller')
const User = require('../../controllers/user/user-controller');

const router = express.Router()

router.get('/bylandlord', Tenant.getByLandlord)
router.post('/', Auth.createTenantUser, Tenant.createTenant, User.connectTenantToUnit)
router.get('/byunit/:id', Tenant.getByUnit)
router.get('/:id', User.getCurrentTenant)

module.exports = router
