const UserModel = require('../models/user/user')

const checkIfUserExists = async (req, res, next) => {
  try {
    const {user_id: id} = req.token
    const userExists = await UserModel.findById(id)
    if (!userExists) {
      res.status(200).json({message: 'no user with this id exists'})
      next()
    } else {
      res.status(400).json({message: 'user already exists'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = checkIfUserExists
