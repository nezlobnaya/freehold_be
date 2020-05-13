exports.up = function (knex) {
  return knex.schema.createTable('user_unit', tbl => {
    tbl.integer('unit_id').references('id').inTable('unit')
    tbl.string('user_id').references('id').inTable('user')
    tbl.date('lease_start')
    tbl.date('lease_end')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_unit')
}
