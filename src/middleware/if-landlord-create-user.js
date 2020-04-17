const User = require('../models/user')

const ifLandlordCreateUser = async (req, res, next) => {
  const {uid, type} = req.body
  // const {user_id: id} = req.decodedToken
  // console.log('id', uid)

  if (type !== 'landlord') {
    return next()
  }

  try {
     await User.create({ id: uid, landlord: true })
    /* eslint-disable-next-line */


    next()
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
}

module.exports = ifLandlordCreateUser
