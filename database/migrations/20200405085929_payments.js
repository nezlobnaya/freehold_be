exports.up = function (knex) {
  return knex.schema.createTable('payments', tbl => {
    tbl.increments('id').unsigned().primary()

    tbl.integer('unit_id').references('id').inTable('unit')
    tbl.string('user_id').references('id').inTable('user')
    tbl.string('type').notNullable()
    tbl.integer('amount').notNullable()
    tbl.date('payment_date').notNullable()
    tbl.boolean('late').notNullable()
    tbl.integer('due_date').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('payments')
}
