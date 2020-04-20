const User = require('../models/user')

const ifLandlordCreateUser = async (req, res, next) => {
  const {uid, type} = req.body

  if (type !== 'landlord') {
    return next()
  }

  try {
    await User.create({id: uid, landlord: true})

    next()
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
}

module.exports = ifLandlordCreateUser
