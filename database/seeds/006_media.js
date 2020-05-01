const {fakeMedia} = require('../../src/lib/db-helpers')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('media')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('media').insert(fakeMedia)
    })
}
