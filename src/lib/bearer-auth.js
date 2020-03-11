const User = require('../models/user')
const {fireAdmin} = require('../lib/firebase')

const bearerAuth = async (req, res, next) => {
  // We get the authorization header and default to an empty string
  const credentials = req.headers.authorization || ''

  const [type, payload] = credentials.split(' ')

  /*
   * To make our middleware graceful, we want to make sure that the authorzation
   * type is Bearer before proceeding as we may implement other authorization
   * methods in the future.
   * */
  if (type === 'Bearer') {
    try {
      //verify token with firebase
      const token = await fireAdmin.auth().verifyIdToken(payload)

      //if token.landord === true
      //type === landlord
      //else
      //type === tenant
      let type
      if (token.landlord) {
        type = 'landlord'
      } else {
        type = 'tenant'
      }

      const user = await User.findByEmail(token.email, type)

      /* eslint-disable-next-line */
      req.user = user

      next()
    } catch (err) {
      return res.status(401).send({error: 'You are not authorized'})
    }
  } else {
    next()
  }
}

module.exports = bearerAuth
