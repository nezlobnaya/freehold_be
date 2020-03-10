const User = require('../models/user')

const ifLandlordCreateUser = async (req, res, next) => {
  const {email, type} = req.body

  if (type !== 'landlord') {
    return next()
  }

  try {
    const user = await User.create({email, type})
    /* eslint-disable-next-line */
    console.log(user)
    req.user = user

    next()
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
}

module.exports = ifLandlordCreateUser
