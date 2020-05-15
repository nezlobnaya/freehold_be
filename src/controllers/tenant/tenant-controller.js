const UserModel = require('../../models/user')
const fireAdmin = require('../../lib/firebase')

const getByLandlord = async (req, res, next) => {
  const {decodedToken} = req
  try {
    const tenants = await UserModel.getTenantsByLandlord(decodedToken.user_id)
    const tenantsWithUserInfo = await Promise.all(
      tenants.map(async tenantInfo => {
        const tenantData = await fireAdmin.auth().getUser(tenantInfo.id)
        tenantInfo.displayName = tenantData.displayName
        tenantInfo.email = tenantData.email
        tenantInfo.phoneNumber = tenantData.phoneNumber
        return tenantInfo
      }),
    )

    if (!tenantsWithUserInfo) {
      res.status(404).json({message: 'couldnt find tenants'})
    } else {
      res.status(200).json(tenantsWithUserInfo)
    }
  } catch (err) {
    next(err)
  }
}

const getByUnit = async (req, res, next) => {
  const {decodedToken} = req
  try {
    const tenants = await UserModel.getTenantsByUnit(
      req.params.id,
      decodedToken,
    )
    if (!tenants) {
      res.status(404).json({message: 'unit not found'})
    } else {
      res.status(200).json(tenants)
    }
  } catch (err) {
    next(err)
  }
}

const createTenant = async (req, res, next) => {
  const {decodedToken} = req
  const {uid} = req
  try {
    const tenant = await UserModel.create({
      id: uid,
      landlord: false,
      landlord_id: decodedToken.user_id,
    })
    if (tenant) {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getByLandlord,
  getByUnit,
  createTenant,
}
