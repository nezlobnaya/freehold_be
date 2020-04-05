exports.up = function(knex) {
  return knex.schema.createTable('media', tbl => {
    tbl
      .increments('id')
      .unsigned()
      .primary()

    tbl.string('type').notNullable()
    tbl
      .string('link')
      .notNullable()
      .unique()
    tbl.string('format').notNullable()
    tbl.string('title').notNullable()
    tbl
      .timestamp('timestamp')
      .defaultTo(knex.fn.now())
      .notNullable()
    tbl
      .integer('work_order_id')
      .references('id')
      .inTable('work_order')
    tbl
      .integer('unit_id')
      .references('id')
      .inTable('unit')
    tbl
      .integer('user_id')
      .references('id')
      .inTable('user')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('media')
}
