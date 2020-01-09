const User = require('../models/user')

/*
 * We want to limit tenants to only signing up if they have been added by a
 * landlord. This middleware will serve as the spot to check that the tenant is
 * authorized (invited) to sign up
 * */
const ifTenantCheckIfAuthorized = async (req, res, next) => {
  if (req.body.type !== 'tenant') {
    next()
    return
  }

  try {
    const tenant = await User.findByEmail(req.body.email)

    if (!tenant) {
      return res.status(401).json({
        message:
          'You must have an invitation from a landlord to join as a tenant',
      })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Something unexpected happened'})
  }
}

module.exports = ifTenantCheckIfAuthorized
