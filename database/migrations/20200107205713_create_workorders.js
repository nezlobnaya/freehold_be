exports.up = function(knex) {
  return knex.schema.createTable('workorders', tbl => {
    // unique id
    tbl.increments()

    tbl.string('title').notNullable() // Work Order Title
    tbl.text('description') // Description of the issue
    tbl.enum('type', ['electrical', 'plumbing', 'HVAC', 'pest control', 'appliances'])
    tbl.date('startDate').notNullable()
    tbl.date('endDate')
    tbl
      .integer('propertyId')
      .unsigned()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    tbl
      .integer('createdBy')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workorders')
}