const {fakeUnits} = require('../../src/lib/db-helpers')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex('unit')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('unit').insert(fakeUnits)
    })
}
