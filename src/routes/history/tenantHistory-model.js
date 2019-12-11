const db = require('../../../database/db-config.js');

module.exports = {
  // Create
  addTenantHistory,
  // Read
  getHistoryById,
  getHistoryByProperty,
  getHistoryByTenant,
  // Update
  updateHistory,
  // Delete
  deleteHistory
};

//#region - CREATE

// addTenantHistory(input) - inserts input to tenant history table and return results by id
async function addTenantHistory(input) {
  const results = await db('tenanthistory').returning('id').insert(input);
  return getHistoryById(results[0]);
}

//#endregion

//#region - READ 

// getHistoryById() - Get tenant history results by id.
function getHistoryById(id) {
  return db('tenanthistory')
    .join('users', 'users.id', 'tenanthistory.tenantId')
    .join('properties', 'properties.id', 'tenanthistory.propertyId')
    .select(
      'tenanthistory.id',
      'tenanthistory.propertyId',
      'properties.propertyName',
      'tenanthistory.tenantId',
      'users.name',
      'users.email',
      'users.phone',
      'tenanthistory.historyStartdate',
      'tenanthistory.historyEnddate'
    )
    .where({ 'tenanthistory.id': id })    
    .first();
}

// getHistoryByProperty() - Get all tenant history results for property, by property id.
function getHistoryByProperty(id) {
  return db('tenanthistory')
    .join('users', 'users.id', 'tenanthistory.tenantId')
    .join('properties', 'properties.id', 'tenanthistory.propertyId')
    .select(
      'tenanthistory.id',
      'tenanthistory.tenantId',
      'users.name',
      'users.email',
      'users.phone',
      'tenanthistory.historyStartdate',
      'tenanthistory.historyEnddate'
    )
    .where({ 'tenanthistory.propertyId': id });
}

// getHistoryByTenant() - Get all tenant history results by tenant id.
function getHistoryByTenant(id) {
  return db('tenanthistory')
    .join('users', 'users.id', 'tenanthistory.tenantId')
    .join('properties', 'properties.id', 'tenanthistory.propertyId')
    .select(
      'tenanthistory.id',
      'tenanthistory.propertyId',
      'properties.propertyName',
      'tenanthistory.historyStartdate',
      'tenanthistory.historyEnddate'
    )
    .where({ 'tenanthistory.tenantId': id });
}

//#endregion

//#region - Update

async function updateHistory(changes, id) {
  await db('tenanthistory').where({ id }).update(changes);
  return getHistoryById(id);
}

//#endregion

//#region - Delete

async function deleteHistory(id) {
  const results = await db('tenanthistory').where({ id }).del();
  return results;
}

//#endregion