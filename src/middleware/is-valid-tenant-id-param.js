const User = require('../models/user')

const isValidTenantIdParam = (key = 'id') => async (req, res, next) => {
  const id = req.params[key]

  try {
    const tenant = await User.findById(id)

    if (!tenant) {
      return res.status(404).json({message: 'No tenant found with that id'})
    }

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = isValidTenantIdParam
