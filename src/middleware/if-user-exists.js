const User = require('../models/user/user-model')

const checkIfUserExists = async (req, res, next) => {
  try {
    const {uid} = req.body
    const userExists = await User.findById(uid)

    if (!userExists) {
      next()
    } else {
      res.status(400).json({message: 'user already exists'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = checkIfUserExists
