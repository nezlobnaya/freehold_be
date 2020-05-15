const User = require('../../models/user')
const fireAdmin = require('../../lib/firebase')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function createLandlordUser(req, res) {
  const {email, uid, type} = req.body

  try {
    //set landlord claim to false on default
    const claimObject = {landlord: false}

    //change landlord claim to true if type = landlord
    if (type === 'landlord') {
      claimObject.landlord = true
    }

    //get uid from req.body object above, set custom claim
    await fireAdmin.auth().setCustomUserClaims(uid, claimObject)

    const msg = {
      to: email,
      from: 'labspt.propman@gmail.com',
      subject: `Thank you, ${email} for Registering at FreeHold!`,
      template_id: process.env.SENDGRID_WELCOME_ID,
    }

    sgMail.send(msg).then(() => {}, console.error)

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
  const {decodedToken, token} = req

  try {
    /*
     * If the users login info is correct, it sets the current user on the
     * global firebase application instance that can be retrieved with
     * firebase.auth().currentUser
     * */

    let type = 'tenant'
    if (decodedToken.landlord === true) {
      type = 'landlord'
    }

    const foundUser = await User.findById(decodedToken.user_id)

    res.status(200).json({token, foundUser, type})
  } catch (err) {
    console.log(err)
    res.status(401).json({
      error: 'Invalid credentials',
    })
  }
}

async function createTenantUser(req, res, next) {
  try {
    const {firstName, lastName, phone, email, password} = req.body
    const user = await fireAdmin.auth().createUser({
      email,
      emailVerified: false,
      phoneNumber: phone,
      password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    })
    await fireAdmin.auth().setCustomUserClaims(user.uid, {landlord: false})
    const msg = {
      to: email,
      from: 'labspt.propman@gmail.com',
      subject: `Welcome, Your tenant account has been created.`,
      template_id: process.env.SENDGRID_WELCOME_ID,
    }
    sgMail.send(msg).then(() => {}, console.error)
    req.uid = user.uid
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createTenantUser,
  createLandlordUser,
  login,
}
