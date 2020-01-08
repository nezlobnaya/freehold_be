const db = require('../../../database/db')
const format = require('date-fns/format')

const table = 'tenanthistory'
const formatStandard = date => (date ? format(date, 'MM/dd/yyyy') : null)

const formatOutput = ({startDate, endDate, ...tenantHistory}) => ({
  ...tenantHistory,
  startDate: formatStandard(startDate),
  endDate: formatStandard(endDate),
})

module.exports = {
  // Create
  create,
  // Read
  getById,
  getByPropertyId,
  getByTenantId,
  // Update
  updateById,
  // Delete
  deleteById,
}

//#region - CREATE

// addTenantHistory(input) - inserts input to tenant history table and return results by id
async function create(input) {
  const [tenantHistory] = await db(table)
    .returning('*')
    .insert(input)

  if (!tenantHistory) {
    return null
  }

  return formatOutput(tenantHistory)
}

async function getAllBy(key, value) {
  const results = await db(table)
    .select('*')
    .where({[key]: value})

  return results.map(formatOutput)
}

async function getBy(key, value) {
  const [first] = await getAllBy(key, value)

  return first ? first : null
}

function getById(id) {
  return getBy('id', id)
}

//#endregion

//#region - READ

// getHistoryByProperty() - Get all tenant history results for property, by property id.
function getByPropertyId(id) {
  return getAllBy('propertyId', id)
}

// getHistoryByTenant() - Get all tenant history results by tenant id.
function getByTenantId(id) {
  return getAllBy('tenantId', id)
}

//#endregion

async function updateAllBy(key, value, changes) {
  const results = await db
    .from(table)
    .returning('*')
    .update(changes)
    .where({[key]: value})

  return results.map(formatOutput)
}

async function updateBy(key, value, changes) {
  const [first] = await updateAllBy(key, value, changes)

  return first ? first : null
}

function updateById(changes, id) {
  return updateBy('id', id, changes)
}

//#region - Update

//#endregion

//#region - Delete

async function deleteAllBy(key, value, returning = '*') {
  const results = await db
    .from(table)
    .where({[key]: value})
    .returning(returning)
    .del()

  return results.map(formatOutput)
}

async function deleteBy(key, value) {
  const [result] = await deleteAllBy(key, value)

  return result ? {deleted: true, tenantHistory: result} : {deleted: false}
}

function deleteById(id) {
  return deleteBy('id', id)
}

//#endregion
