const fireAdmin = require('firebase-admin')

const restricted = async (req, res, next) => {
  try {
    const {authorization} = req.headers
    if (authorization) {
      const verified = await fireAdmin.auth().verifyIdToken(authorization)
      req.token = verified
      console.log('token', req.token)
      next()
    } else {
      res.status(401).json({message: 'not authorized or expired authorization'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = restricted
