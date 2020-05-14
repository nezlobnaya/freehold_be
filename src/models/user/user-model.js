const db = require('../../../database/db')
const fireAdmin = require('../../lib/firebase')

const table = 'user'

const landlordReturning = ['id', 'landlord']

const tenantReturning = '*'

async function create(input) {
  let user = null
  if (!input.landlord_id) {
    user = await db(table)
      .insert({id: input.id, landlord: input.landlord})
      .returning('*')
  } else {
    user = await db(table)
      .insert({
        id: input.id,
        landlord: input.landlord,
        landlord_id: input.landlord_id,
      })
      .returning('*')
  }
  return user
}

async function findByEmail(email, type) {
  const [user] = await db
    .from(table)
    .select(type === 'tenant' ? tenantReturning : landlordReturning)
    .where({email})

  return user || null
}

async function findById(id, returning = landlordReturning) {
  const [user] = await db.from(table).select(returning).where({id})

  return user || null
}

async function findTenantById(id) {
  const user = await fireAdmin.auth().getUser(id)
  return user || null
}

async function updateByEmail(email, update, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .update(update)
    .where({email})
    .returning(returning)

  return user ? {updated: true, user} : {updated: false}
}

async function getTenantsByUnit(id) {
  const tenants = await db
    .from('user_unit')
    .select('*')
    .join('user', 'user.id', '=', 'user_unit.user_id')
    .where({unit_id: id})
    .andWhere('user.landlord', false)
  const tenantsWithUserInfo = await Promise.all(
    tenants.map(async tenantInfo => {
      const tenantData = await fireAdmin.auth().getUser(tenantInfo.user_id)
      tenantInfo.displayName = tenantData.displayName
      tenantInfo.email = tenantData.email
      tenantInfo.phoneNumber = tenantData.phoneNumber
      return tenantInfo
    }),
  )
  return tenantsWithUserInfo
}

async function addTenantsToUnit(unit_id, user_id, lease_start, lease_end) {
  const tenants = await db.from('user_unit').insert({
    unit_id: unit_id,
    user_id: user_id,
    lease_start: lease_start,
    lease_end: lease_end,
  })

  return tenants
}

function getTenantsByLandlord(id) {
  return db
    .from('user')
    .leftJoin('user_unit', 'user_unit.user_id', '=', 'user.id')
    .leftJoin('unit', 'unit.id', '=', 'user_unit.unit_id')
    .where({landlord_id: id})
    .select(
      'user.id',
      'unit.id as unit_id',
      'user.landlord',
      'user.landlord_id',
      'user_unit.lease_start',
      'user_unit.lease_end',
      'unit.name as unit_name',
      'unit.street_address',
      'unit.city',
      'unit.state',
      'unit.zip',
      'unit.occupied',
      'unit.rent',
    )
}

async function canAccessTenant(landlordId, tenantId) {
  const tenant = await findById(tenantId, 'landlordId')

  return tenant.landlordId === landlordId
}

async function updateTenantById(id, update) {
  const [tenant] = await db
    .from(table)
    .update(update)
    .where({id})
    .returning('*')

  return tenant ? {updated: true, user: tenant} : {updated: false}
}

module.exports = {
  addTenantsToUnit,
  canAccessTenant,
  create,
  findByEmail,
  findById,
  findTenantById,
  updateByEmail,
  updateTenantById,
  getTenantsByUnit,
  getTenantsByLandlord,
}
