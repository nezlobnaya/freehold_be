exports.up = function (knex) {
  return knex.schema.createTable('work_order', tbl => {
    tbl.increments('id').unsigned().primary()

    tbl.string('name').notNullable()
    tbl.string('description').notNullable()
    tbl.string('type').notNullable()
    tbl.string('status').notNullable().defaultTo('submitted')
    tbl.string('comment')
    tbl.timestamp('start_date').defaultTo(knex.fn.now()).notNullable()
    tbl.timestamp('update_date').defaultTo(knex.fn.now()).notNullable()
    tbl.integer('unit_id').references('id').inTable('unit')
    tbl.string('user_id').references('id').inTable('user')
    tbl.boolean('in_house').notNullable().defaultTo(true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('work_order')
}
