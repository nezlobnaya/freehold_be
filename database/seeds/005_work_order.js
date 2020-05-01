const {fakeWorkOrders} = require('../../src/lib/db-helpers')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('work_order')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('work_order').insert(fakeWorkOrders)
    })
}
