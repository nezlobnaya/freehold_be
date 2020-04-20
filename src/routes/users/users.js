const express = require('express')
const Users = require('../../controllers/users/')
const restricted = require('../../middleware/restricted')

const router = express.Router()

const validateUserUpdateInput = (req, res, next) => {
  if (req.body.uid || req.body.uid === '' || req.body.uid === null) {
    return res.status(400).json({message: 'Cannot update email at this time'})
  }

  next()
}

router.get('/me', restricted, Users.getCurrent)

router.put(
  '/me',
  restricted,
  // requireAuth,
  validateUserUpdateInput,
  Users.updateCurrent,
)

module.exports = router
