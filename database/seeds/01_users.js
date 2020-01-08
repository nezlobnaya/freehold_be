const {seedUsers} = require('../../src/lib/db-helpers')

exports.seed = function(knex) {
  console.log(seedUsers)
  return knex.from('users').insert(seedUsers)
}
