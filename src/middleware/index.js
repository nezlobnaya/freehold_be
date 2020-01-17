const ifLandlordCreateUser = require('./if-landlord-create-user')
const ifTenantCheckIfAuthorized = require('./if-tenant-check-if-authorized')
const isValidTenantId = require('./is-valid-tenant-id')
const isValidTenantIdParam = require('./is-valid-tenant-id-param')
const isValidPropertyId = require('./is-valid-property-id')
const isValidPropertyIdParam = require('./is-valid-property-id-param')
const validateTenantHistoryInput = require('./validate-tenant-history-input')
const requireLandlord = require('./require-landlord')

module.exports = {
  ifLandlordCreateUser,
  ifTenantCheckIfAuthorized,
  isValidTenantId,
  isValidTenantIdParam,
  isValidPropertyId,
  isValidPropertyIdParam,
  validateTenantHistoryInput,
  requireLandlord,
}
