const moment = require("moment");

const validateTenantHistoryInput = (req, res, next) => {
  const { tenantId, propertyId, startDate, endDate } = req.body;
  let errors = {};

  if (!tenantId) {
    errors.tenantId = "Field `tenantId` is required";
  } else if (isNaN(tenantId)) {
    errors.tenantId = "Field `tenantId` needs to be a number";
  }

  if (!propertyId) {
    errors.propertyId = "Field `propertyId` is required";
  } else if (isNaN(propertyId)) {
    errors.propertyId = "Field `propertyId` needs to be a number";
  }

  if (!startDate) {
    errors.startDate = "Field `startDate` is required";
  } else if (!moment(startDate).isDate()) {
    errors.startDate = "Field `startDate` must be a valid date";
  }

  if (endDate && !moment(endDate).isDate()) {
    errors.endDate = "Field `endDate` must be a valid date";
  }

  if (Object.keys(errors).length > 0) {
    return res.send(400).json({ errors });
  }

  const input = {
    tenantId,
    propertyId,
    startDate: startDate || moment(startDate).format("L"),
    endDate: endDate || moment(endDate).format("L")
  };

  req.input = input;

  return next();
};

module.exports = validateTenantHistoryInput;
