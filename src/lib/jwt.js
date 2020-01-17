const jwt = require('jsonwebtoken')

const signToken = payload => {
  const secret = process.env.JWT_SECRET || '1234'

  return jwt.sign(payload, secret, {expiresIn: '7d'})
}

module.exports = {signToken}
