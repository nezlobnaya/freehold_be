const express = require('express')
const validateAuthInput = require('../../lib/validate-auth-input')
const {
  ifLandlordCreateUser,
  ifTenantCheckIfAuthorized,
} = require('../../middleware')
const restricted = require('../../middleware/restricted')
const checkIfUserExists = require('../../middleware/if-user-exists')

const Auth = require('../../controllers/auth/')

const router = express.Router()

router.post(
  '/register',
  validateAuthInput(true),
  restricted,
  checkIfUserExists,
  ifTenantCheckIfAuthorized,
  ifLandlordCreateUser,
  Auth.createUser,
)

router.post('/login', validateAuthInput(), restricted, Auth.login)

module.exports = router
