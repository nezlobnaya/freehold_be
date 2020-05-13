const UserModel = require('../../models/user')

const getByLandlord = async (req, res, next) => {
  try {
    const tenants = await UserModel.getTenantsByLandlord(req.params.id)
    if (!tenants) {
      res.status(404).json({message: 'couldnt find tenants'})
    } else {
      res.status(200).json(tenants)
    }
  } catch (err) {
    next(err)
  }
}

const getByUnit = async (req, res, next) => {
  try {
    const tenants = await UserModel.getTenantsByUnit(req.params.id)
    if (!tenants) {
      res.status(404).json({message: 'unit not found'})
    } else {
      res.status(200).json(tenants)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getByLandlord,
  getByUnit,
}
