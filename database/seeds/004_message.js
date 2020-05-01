const {fakeMessages} = require('../../src/lib/db-helpers')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex('message')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('message').insert(fakeMessages)
    })
}
