exports.up = function (knex) {
  return knex.schema.createTable('unit', tbl => {
    tbl.increments('id').unsigned().primary()

    tbl.string('name').notNullable()
    tbl.string('street_address').notNullable().unique()
    tbl.string('city').notNullable()
    tbl.string('state').notNullable()
    tbl.string('zip').notNullable()
    tbl.integer('occupied').notNullable().defaultTo(0)
    tbl.integer('rent').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('unit')
}
