// const {seedProperties} = require('../../src/lib/db-helpers')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex.from('properties').insert(seedProperties) -- mine is breaking
  
  return knex.from("properties").insert([
    { // id: 1, (auto)
      'name': "Name for the Property",
      'street': "1 First St",
      'city': "Salt Lake City",
      'state': "Utah",
      'zip': "84101",
      'status': "occupied", // vacant or occupied
      'image': "property.jpg",
      'landlordId': 1
    },
    { // id: 2, (auto)
      'name': "Sample",
      'street': "1 First St",
      'city': "Salt Lake City",
      'state': "Utah",
      'zip': "84101",
      'status': "vacant",
      'landlordId': 1
    },
  ]);
}
