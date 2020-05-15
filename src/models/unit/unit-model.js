const db = require('../../../database/db')

module.exports = {
  addUnit,
  getUnitById,
  getUnitByAddress,
  getAllUnits,
  getPropertiesByUser,
  updateUnit,
  deleteProperty,
}

// addUnit(input) - inserts input to properties and return results for a property by id inserted
async function addUnit(input, decodedToken) {
  const results = await db('unit').insert(input).returning('*')
  const data = results[0]
  if (data) {
    await db('user_unit').insert({
      unit_id: data.id,
      user_id: decodedToken.user_id,
    })
  }
  return data
}

// getUnitById() - return results for a property by id
async function getUnitById(id) {
  const unit = await db('unit').where({id}).first()

  return unit
}

async function getUnitByAddress(address) {
  const unit = await db('unit').where({street_address: address}).select('*').first()
  return unit
}

// getAllUnits() - return all properties
function getAllUnits(decodedToken) {
  return db.raw(
    `SELECT DISTINCT unit.id, unit.name, unit.street_address, unit.city, unit.state, unit.zip, unit.occupied, unit.rent
    FROM public.user join
    public.user_unit ON user_unit.user_id = public.user.id join
    public.unit ON unit.id = public.user_unit.unit_id
    where public.user.id = ?`,
    [decodedToken.user_id],
  )
}

// getPropertiesByUser - return all properties for a specific user by the user's email
async function getPropertiesByUser(landlordId) {
  return db
    .from('properties as p')
    .where({'p.landlordId': landlordId})
    .select('*')
}

async function updateUnit(changes, id) {
  const [property] = await db('unit').where({id}).update(changes).returning('*')

  return property ? {updated: true, property} : {updated: false}
}

//#endregion

//#region - Delete

async function deleteProperty(id) {
  const results = await db('properties').where({id}).del()

  return results === 1 ? {deleted: true} : {deleted: false}
}

//#endregion
