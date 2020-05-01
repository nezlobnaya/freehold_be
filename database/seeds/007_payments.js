const {fakePayments} = require('../../src/lib/db-helpers')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('payments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('payments').insert(fakePayments)
    })
}
