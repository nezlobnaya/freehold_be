const R = require('ramda')
const User = require('../../models/user')
const jtoken = require('jsonwebtoken')
const {fireAdmin} = require('../../lib/firebase')

async function createUser(req, res) {
  const {email, uid, type} = req.body

  try {
    //set landlord claim to false on default
    const claimObject = {landlord: false}

    //change landlord claim to true if type = landlord
    if (type === 'landlord') {
      claimObject.landlord = true
    }

    //get uid from the user variable above, set custom claim
    await fireAdmin.auth().setCustomUserClaims(uid, claimObject)

    res.status(201).json({
      uid,
      user: {
        type,
        email,
      },
    })
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).json({message: 'Email is already used'})
    }

    // TODO: Come back and address additional issues from firebase
    res.status(500).json(err)
  }
}

async function login(req, res) {
  const {email, token} = req.body

  try {
    /*
     * Firebase auth does some magical stuff here.
     * If the users login info is correct, it sets the current user on the
     * global firebase application instance that can be retrieved with
     * firebase.auth().currentUser
     * */
    const decodedToken = await jtoken.decode(token)

    let type = 'tenant'
    if (decodedToken.landlord === true) {
      type = 'landlord'
    }

    const foundUser = await User.findByEmail(email)

    const user = R.pick(['email'], foundUser)

    res.status(200).json({token, user, type: type})
  } catch (err) {
    console.log(err)
    res.status(401).json({
      error: 'Invalid credentials',
    })
  }
}

module.exports = {
  createUser,
  login,
}
