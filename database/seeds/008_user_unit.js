const {fakeUserUnits} = require('../../src/lib/db-helpers')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_unit')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_unit').insert(fakeUserUnits)
    })
}
