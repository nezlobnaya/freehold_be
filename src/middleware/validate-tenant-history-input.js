const isDate = require('date-fns/isDate')

const validateTenantHistoryInput = (req, res, next) => {
  const {tenantId, propertyId, startDate, endDate} = req.body
  let errors = {}

  if (!tenantId) {
    errors.tenantId = 'Field `tenantId` is required'
  } else if (isNaN(tenantId)) {
    errors.tenantId = 'Field `tenantId` needs to be a number'
  }

  if (!propertyId) {
    errors.propertyId = 'Field `propertyId` is required'
  } else if (isNaN(propertyId)) {
    errors.propertyId = 'Field `propertyId` needs to be a number'
  }

  if (!startDate) {
    errors.startDate = 'Field `startDate` is required'
  } else if (isDate(startDate)) {
    errors.startDate = 'Field `startDate` must be a valid date'
  }

  if (endDate && isDate(endDate)) {
    errors.endDate = 'Field `endDate` must be a valid date'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({errors})
  }

  const input = {
    tenantId,
    propertyId,
    startDate: startDate,
    endDate: endDate,
  }

  req.input = input

  return next()
}

module.exports = validateTenantHistoryInput
