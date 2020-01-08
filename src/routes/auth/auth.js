const express = require('express')
const validateAuthInput = require('../../lib/validate-auth-input')
const Auth = require('../../controllers/auth/')

const router = express.Router()

router.post('/register', validateAuthInput, Auth.createUser)

router.post('/login', validateAuthInput, Auth.login)

module.exports = router
