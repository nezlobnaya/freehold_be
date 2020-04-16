const express = require('express')
const Users = require('../../controllers/users/')

// const bearerAuth = require('../../lib/bearer-auth')
const restricted = require('../../middleware/restricted')
const requireAuth = require('../../lib/require-auth')

const router = express.Router()

const validateUserUpdateInput = (req, res, next) => {
  if (req.body.email || req.body.email === '' || req.body.email === null) {
    return res.status(400).json({message: 'Cannot update email at this time'})
  }

  next()
}

router.get('/me', restricted, requireAuth, Users.getCurrent)

router.put(
  '/me',
  restricted,
  requireAuth,
  validateUserUpdateInput,
  Users.updateCurrent,
)

module.exports = router
