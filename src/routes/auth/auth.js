const express = require('express')
const validateAuthInput = require('../../lib/validate-auth-input')
const {ifTenantCheckIfAuthorized} = require('../../middleware')

const Auth = require('../../controllers/auth/')

const router = express.Router()

router.post(
  '/register',
  validateAuthInput(true),
  ifTenantCheckIfAuthorized,
  Auth.createUser,
)

router.post('/login', validateAuthInput(), Auth.login)

module.exports = router
