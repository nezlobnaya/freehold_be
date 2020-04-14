const User = require('../models/user')

const ifLandlordCreateUser = async (req, res, next) => {
  const {email, type} = req.body
  const {user_id: id} = req.token
  console.log('id', id)

  if (type !== 'landlord') {
    return next()
  }

  try {
    const user = await User.create({email, landlord: true, id})
    /* eslint-disable-next-line */
    req.user = user

    next()
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
}

module.exports = ifLandlordCreateUser
