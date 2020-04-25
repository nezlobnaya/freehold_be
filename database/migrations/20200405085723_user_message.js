exports.up = function (knex) {
  return knex.schema.createTable('user_message', tbl => {
    tbl.string('user_id').references('id').inTable('user')
    tbl.integer('message_id').references('id').inTable('message')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_message')
}
