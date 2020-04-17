const User = require('../../models/user')

async function getCurrent(req, res) {
  try {
    const { decodedToken } = req
    const user = await User.findById(decodedToken.user_id)
    console.log(user)

    // let returnValue = {
    //   // firstName: user.firstName,
    //   // lastName: user.lastName,
    //   type: user.type
    // }

    if (!user) {
      return res.sendStatus(404)
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    console.error(err)

    // TODO: Come back and change this
    res.status(500).json({message: 'Internal Server Error'})
  }
}

async function updateCurrent(req, res) {
  try {
    const {updated, user} = await User.updateByEmail(req.user.email, req.body)

    if (!updated) {
      return res.status(500).json({message: 'Update failed'})
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    console.error(err)

    res.status(500).json({message: 'Internal Server Error'})
  }
}

module.exports = {
  getCurrent,
  updateCurrent,
}
