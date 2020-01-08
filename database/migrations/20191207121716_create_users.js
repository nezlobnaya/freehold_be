exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    // unique id
    tbl.increments('id')

    tbl.string('email').notNullable()
    tbl.enum('type', ['dev', 'landlord', 'tenant']).notNullable()

    // NICE TO HAVE INFO

    tbl.string('phone')
    tbl.string('firstName')
    tbl.string('lastName')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
