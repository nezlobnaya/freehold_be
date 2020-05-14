const express = require('express')
const validateAuthInput = require('../../lib/validate-auth-input')
const {
  ifLandlordCreateUser,
  ifTenantCheckIfAuthorized,
} = require('../../middleware')
const checkIfUserExists = require('../../middleware/if-user-exists')

const Auth = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.post(
  '/register',
  validateAuthInput(true),
  checkIfUserExists,
  ifTenantCheckIfAuthorized,
  ifLandlordCreateUser,
  Auth.createLandlordUser,
)

router.post('/login', validateAuthInput(), Auth.login)

module.exports = router
