exports.up = function(knex) {
  return knex.schema.createTable('work_order', tbl => {
    tbl
      .increments('id')
      .unsigned()
      .primary()

    tbl.string('name').notNullable()
    tbl.string('description').notNullable()
    tbl.string('type').notNullable()
    tbl.string('status').notNullable()
    tbl
      .timestamp('start_date')
      .defaultTo(knex.fn.now())
      .notNullable()
    tbl
      .timestamp('end_date')
      .defaultTo(knex.fn.now())
      .notNullable()
    tbl
      .integer('unit_id')
      .references('id')
      .inTable('unit')
    tbl
      .integer('user_id')
      .references('id')
      .inTable('user')
    tbl.boolean('in_house').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('work_order')
}
