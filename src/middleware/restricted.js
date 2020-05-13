const fireAdmin = require('firebase-admin')

const restricted = async (req, res, next) => {
  const {authorization} = req.headers
  try {
    //TODO: invalid signature handling
    if (authorization) {
      const verified = await fireAdmin.auth().verifyIdToken(authorization)
      req.decodedToken = verified
      req.token = authorization

      next()
    } else {
      res.status(401).json({message: 'not authorized or expired authorization'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = restricted
