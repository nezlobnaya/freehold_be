exports.up = function (knex) {
  return knex.schema.createTable('message', tbl => {
    tbl.increments('id').unsigned().primary()

    tbl.integer('conversation_id').notNullable()
    tbl.string('message').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('message')
}
