exports.up = function(knex) {
  return knex.schema.createTable('user_unit', tbl => {
    tbl
      .integer('unit_id')
      .references('id')
      .inTable('unit')
    tbl
      .integer('user_id')
      .references('id')
      .inTable('user')
    tbl.date('lease_start').notNullable()
    tbl.date('lease_end').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_unit')
}
