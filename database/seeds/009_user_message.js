const {fakeUserMessages} = require('../../src/lib/db-helpers')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_message')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_message').insert(fakeUserMessages)
    })
}
