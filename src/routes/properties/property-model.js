const db = require('../../../database/db-config.js');

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
  deleteProperty
};

//#region - CREATE

// addProperty(input) - inserts input to properties and return results for a property by id inserted
async function addProperty(input) {
  const results = await db('properties').returning('id').insert(input);
  return getProperty(results[0]);
}

//#endregion

//#region - READ 

// getProperty() - return results for a property by id
function getProperty(id) {
  return db('properties')
    .join('users', 'users.id', 'properties.landlordId')
    .select(
      'properties.id as propertiesId',
      'propertyName',
      'propertyAddress',
      'propertyImage',
      'propertyStatus',
      'propertyStartdate',
      'propertyEnddate',
      'propertyName',
      'users.name', 
      'users.email'
    )
    .where({ 'properties.id': id })
    .first();
}

// getAllProperties() - return all properties
function getAllProperties() {	
  return db('properties')
    .join('users', 'users.id', 'properties.landlordId')
    .select(
      'properties.id as propertiesId',
      'propertyName',
      'propertyAddress',
      'propertyImage',
      'propertyStatus',
      'propertyStartdate',
      'propertyEnddate',
      'propertyName',
      'users.name', 
      'users.email'
    )
}

// getPropertiesByUser - return all properties for a specific user by the user's email
function getPropertiesByUser(user) {
  return db('properties')
  .join('users', 'users.id', 'properties.landlordId')
  .select(
    'properties.id as propertiesId',
    'propertyName',
    'propertyAddress',
    'propertyImage',
    'propertyStatus',
    'propertyStartdate',
    'propertyEnddate',
    'propertyName',
    'users.name', 
    'users.email'
  )
  .where({ 'users.email': user });
}

//#endregion - Get

//#region - Update

async function updateProperty(changes, id) {
  await db('properties').where({ id }).update(changes);
  return getProperty(id);
}

//#endregion

//#region - Delete

function deleteProperty(id) {}

//#endregion