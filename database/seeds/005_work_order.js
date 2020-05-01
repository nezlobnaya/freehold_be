const {fakeWorkOrders} = require('../../src/lib/db-helpers')

console.log(fakeWorkOrders)

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('work_order')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('work_order').insert(fakeWorkOrders)
    })
}
