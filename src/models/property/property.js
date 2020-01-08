const db = require('../../../database/db')

module.exports = {
  // Create
  addProperty,
  // Read
  getProperty,
  getAllProperties,
  getPropertiesByUser,
  // Update
  updateProperty,
  // Delete
  deleteProperty,
}

//#region - CREATE

// addProperty(input) - inserts input to properties and return results for a property by id inserted
async function addProperty(input, userId) {
  const results = await db('properties')
    .returning('id')
    .insert({...input, landlordId: userId})
  return getProperty(results[0])
}

//#endregion

//#region - READ

// getProperty() - return results for a property by id
async function getProperty(id) {
  const [property] = await db
    .from('properties')
    .select('*')
    .where({id})

  return property || null
}

// getAllProperties() - return all properties
function getAllProperties() {
  return db('properties as p')
    .join('users as u', 'u.id', 'p.landlordId')
    .select(
      'p.id',
      'name',
      'p.street',
      'p.city',
      'p.state',
      'p.zip',
      'p.image',
      'status',
      'u.firstName',
      'u.lastName',
      'u.email',
    )
}

// getPropertiesByUser - return all properties for a specific user by the user's email
async function getPropertiesByUser(landlordId) {
  return db
    .from('properties as p')
    .where({'p.landlordId': landlordId})
    .select('*')
}

//#endregion - Get

//#region - Update

async function updateProperty(changes, id) {
  const [property] = await db
    .from('properties')
    .update(changes)
    .where({id})
    .returning('*')

  return property ? {updated: true, property} : {updated: false}
}

//#endregion

//#region - Delete

async function deleteProperty(id) {
  const results = await db('properties')
    .where({id})
    .del()

  return results === 1 ? {deleted: true} : {deleted: false}
}

//#endregion
