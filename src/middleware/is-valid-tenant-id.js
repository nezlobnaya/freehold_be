const User = require('../models/user')

const isValidTenantId = async (req, res, next) => {
  const {tenantId} = req.body

  try {
    const user = await User.findById(tenantId)

    if (!user || user.type !== 'tenant') {
      return res.status(404).json({message: 'No tenant exists with that id'})
    }

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = isValidTenantId
