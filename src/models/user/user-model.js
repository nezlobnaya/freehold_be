const db = require('../../../database/db')

const table = 'user'

const landlordReturning = ['id', 'landlord']

const tenantReturning = '*'

async function create(input) {
  console.log('input = ', input)
  const [user] = await db(table)
    .insert({id: input.id, landlord: input.landlord})
    .returning('*')

  console.log(user)
  user.email = input.email
  user.type = 'landlord'
  console.log(user)
  return user || null
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

function findTenantById(id) {
  return findById(id, '*')
}

async function updateByEmail(email, update, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .update(update)
    .where({email})
    .returning(returning)

  return user ? {updated: true, user} : {updated: false}
}

function getAllTenantsByPropertyId(id) {
  return db.from(table).select('*').where({residenceId: id})
}

async function getTenantsByLandlord(id) {
  const tenants = await db
    .from('user_unit')
    .select('*')
    .where({user_id: id})

  return tenants
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
  canAccessTenant,
  create,
  findByEmail,
  findById,
  findTenantById,
  updateByEmail,
  updateTenantById,
  getAllTenantsByPropertyId,
  getTenantsByLandlord,
}
