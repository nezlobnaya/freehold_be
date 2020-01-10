const db = require('../../database/db')
const cleaner = require('knex-cleaner')

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
  // Users
  const masterUser = {
    firstName: 'Master',
    lastName: 'User',
    email: 'masterUser@gmail.com',
    phone: '1238675309',
    type: 'dev'
  }
  const landlord = {
    firstName: 'Landlord',
    lastName: 'User',
    email: 'landlord@gmail.com',
    phone: '1238675309',
    type: 'landlord'
  }
  const tenant = {
    firstName: 'Tenant',
    lastName: 'User',
    email: 'tenant@gmail.com',
    phone: '1238675309',
    type: 'tenant'
  }
  // Properties
  const prop1 = {
    'name': "Name for the Property",
    'street': "1 First St",
    'city': "Salt Lake City",
    'state': "Utah",
    'zip': "84101",
    'status': "occupied", // vacant or occupied
    'image': "property.jpg",
    'landlordId': 1
  }
  const prop2 = {
    'name': "Sample",
    'street': "1 First St",
    'city': "Salt Lake City",
    'state': "Utah",
    'zip': "84101",
    'status': "vacant",
    'landlordId': 1
  }
  // Work Orders
  const workorder1 = {
    // id: 1, (auto)
    title: 'Work Order Title',
    description: 'Description of the issue. For example: Tub is leaking.',
    type: 'plumbing',
    startDate: '10-31-2018',
    endDate: '11-05-2018',
    propertyId: 1,
    createdBy: 2,
  }
  const workorder2 = {
    // id: 2, (auto)
    title: 'Short Description',
    description: 'Description of the issue. For example: Lights not working in the living room.',
    type: 'electrical',
    startDate: '11-03-2019',
    endDate: null,
    propertyId: 1,
    createdBy: 3
  }

  // Insert into Tables
  await insertUsers([landlord, tenant, masterUser])
  await insertProperties([prop1, prop2])
  await insertWorkorders([workorder1, workorder2])
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
