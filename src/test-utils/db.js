const db = require('../../database/db.js')
const cleaner = require('knex-cleaner')
const seedData = require('../../database/seedData.js')

const reset = async () => {
  try {
    await cleaner.clean(db, {
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
  } catch (err) {
    console.error(err)
  }
}

const destroyConn = async () => {
  await db.destroy()
}

const insertResourceIntoTable = tableName => resource =>
  db
    .from(tableName)
    .insert(resource)
    .returning('*')

// Users
const insertUsers = insertResourceIntoTable('users as u')
const getAllUsers = () => db.from('users as u')
// Properties
const getAllProperties = () => db.from('properties as p')
const insertProperties = insertResourceIntoTable('properties as p')
// Tenant History
const getAllTenantHistory = () => db.from('tenanthistory')
const insertTenantHistories = insertResourceIntoTable('tenanthistory')
// Workorders
const getAllWorkorders = () => db.from('workorders as w')
const insertWorkorders = insertResourceIntoTable('workorders as w')

const seedTables = async () => {
  const { users, properties, workorders } = seedData

  // Insert into Tables
  await insertUsers([users.landlord, users.tenant, users.master])
  await insertProperties([properties.prop1, properties.prop2])
  await insertWorkorders([workorders.workorder1, workorders.workorder2])
}

module.exports = {
  reset,
  destroyConn,
  seedTables,
  getAllProperties,
  getAllUsers,
  getAllTenantHistory,
  getAllWorkorders,
  insertProperties,
  insertUsers,
  insertTenantHistories,
  insertWorkorders,
}
