const isValidTenantId = require("./is-valid-tenant-id");
const isValidTenantIdParam = require("./is-valid-tenant-id-param");
const isValidPropertyId = require("./is-valid-property-id");
const isValidPropertyIdParam = require("./is-valid-property-id-param");
const validateTenantHistoryInput = require("./validate-tenant-history-input");

module.exports = {
  isValidTenantId,
  isValidTenantIdParam,
  isValidPropertyId,
  isValidPropertyIdParam,
  validateTenantHistoryInput
};
