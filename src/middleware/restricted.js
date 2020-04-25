const fireAdmin = require('firebase-admin')

const restricted = async (req, res, next) => {
  try {
    const {authorization} = req.headers

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
