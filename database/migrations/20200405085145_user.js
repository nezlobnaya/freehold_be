exports.up = function(knex) {
  return knex.schema.createTable('user', tbl => {
    tbl
      .increments('id')
      .unsigned()
      .primary()

    tbl.boolean('landlord').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user')
}
