const requireLandlord = (req, res, next) => {
  const userType = (req.user && req.user.type) || ''

  if (userType !== 'landlord') {
    return res
      .status(401)
      .json({error: 'User is not authorized for that operation'})
  }

  next()
}

module.exports = requireLandlord
