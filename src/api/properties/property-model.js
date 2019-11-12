const db = require('../../../database/db-config.js');

module.exports = {
  // Create
  addProperty,
  // Read
  getProperty,
  getAllProperties,
  // Update
  updateProperty,
  // Delete
  deleteProperty
};

//#region - CREATE

function addProperty(input) {}

//#endregion

//#region - READ 

// getProperty() - return results for a property by id
function getProperty(id) {}

// getAllProperties() - return all properties
function getAllProperties() {
  return db('properties');
}

//#endregion - Get

//#region - Update

function updateProperty(changes, id) {}

//#endregion

//#region - Delete

function deleteProperty(id) {}

//#endregion