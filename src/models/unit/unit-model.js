const db = require('../../../database/db')

module.exports = {
  addUnit,
  getUnitById,
  getAllUnits,
  getPropertiesByUser,
  updateUnit,
  deleteProperty,
}

// addUnit(input) - inserts input to properties and return results for a property by id inserted
async function addUnit(input) {
  const results = await db('unit').insert(input).returning('*')

  return results[0]
}

// getUnitById() - return results for a property by id
async function getUnitById(id) {
  const unit = await db('unit').where({id}).first('*')

  return unit
}

// getAllUnits() - return all properties
function getAllUnits(decodedToken) {
  db('unit').select('*')
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
