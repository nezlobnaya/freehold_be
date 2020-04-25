const User = require('../models/user')

/*
 * We want to limit tenants to only signing up if they have been added by a
 * landlord. This middleware will serve as the spot to check that the tenant is
 * authorized (invited) to sign up
 * */
const ifTenantCheckIfAuthorized = async (req, res, next) => {
  try {
    if (req.body.type === 'tenant') {
      const tenant = await User.findById(req.body.uid)

      if (!tenant) {
        res.status(401).json({
          message:
            'You must have an invitation from a landlord to join as a tenant',
        })
      } else {
        req.user = tenant

        next()
      }
    }
    next()
    /* eslint-disable-next-line */
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Something unexpected happened'})
  }
}

module.exports = ifTenantCheckIfAuthorized
