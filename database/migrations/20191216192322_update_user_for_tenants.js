exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl
      .integer('residenceId')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    tbl
      .integer('landlordId')
      .unsigned()
      .references('id')
      .inTable('users')
  })
}

exports.down = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumn('residenceId')
    tbl.dropColumn('landlordId')
  })
}
