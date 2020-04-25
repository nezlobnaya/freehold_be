exports.up = function (knex) {
  return knex.schema.createTable('user', tbl => {
    tbl.string('id').unsigned().primary()

    tbl.boolean('landlord').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user')
}
