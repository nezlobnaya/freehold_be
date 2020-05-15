const User = require('../../models/user')

async function getCurrent(req, res, next) {
  try {
    const {decodedToken} = req
    const user = await User.findById(decodedToken.user_id)

    if (!user) {
      return res.sendStatus(404)
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
}

async function getCurrentTenant(req, res, next) {
  try {
    const { id } = req.params
    const user = await User.findTenantById(id)

    if (!user) {
      return res.sendStatus(404)
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
}

async function updateCurrent(req, res, next) {
  try {
    const {updated, user} = await User.updateByEmail(req.user.email, req.body)

    if (!updated) {
      return res.status(500).json({message: 'Update failed'})
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
}

async function connectTenantToUnit(req, res, next) {
  const { unit_id, lease_start, lease_end } = req.body
  const { uid } = req
  try {
    const tenant = await User.addTenantsToUnit(unit_id, uid, lease_start, lease_end)

    return res.status(200).json(tenant)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  connectTenantToUnit,
  getCurrent,
  getCurrentTenant,
  updateCurrent,
}
