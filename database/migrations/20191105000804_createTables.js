
exports.up = function(knex) {
  return knex.schema
  
  // users
  .createTable("users", tbl => {
    tbl.increments();
    // tbl.string('username').notNullable().unique(); -- use email as username
    // tbl.string('password').notNullable(); -- password not needed if using Firebase
    tbl.json("name").notNullable(); // currently going to try as a json ... this is still under review depending on how tests turn out.
    tbl.string('email').notNullable().unique();
    tbl.json("address");
    tbl.enu('type', ['landlord', 'tenant', 'dev']).notNullable();
    tbl.string('phone');
  })
  
  // properties
  .createTable("properties", tbl => {
    tbl.increments();
    tbl.string('propertyName').notNullable();
    tbl.json('propertyAddress').notNullable();
    tbl.string('propertyImage');
    tbl.string('propertyStatus');
    tbl.date('propertyStartdate');
    tbl.date('propertyEnddate');
    tbl.integer('landlordId').unsigned()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
  })
  
  // tenanthistory
  .createTable("tenanthistory", tbl => {
    tbl.increments();
    tbl.integer('tenantId').unsigned()
      .references('id').inTable('users');
    tbl.integer('propertyId').unsigned()
      .references('id').inTable('properties');
    tbl.date('historyStartdate');
    tbl.date('historyEnddate');
  })
  
  // workorders
  .createTable("workorders", tbl => {
    tbl.increments();
    tbl.string('workorder').notNullable();
    tbl.text('woDescription').notNullable();
    tbl.string('woType').notNullable();
    tbl.date('woStartdate').notNullable();
    tbl.date('woEnddate');
    tbl.integer('propertyId').unsigned()
      .references('id').inTable('properties')
      .onUpdate('CASCADE').onDelete('CASCADE');
  })
  
  // wohistory
  .createTable("wohistory", tbl => {
    tbl.increments();
    tbl.integer('woId').unsigned()
      .references('id').inTable('workorders')
      .onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('woStatus');
    tbl.integer('woUrgency');
    tbl.json('woUpdate');
    tbl.timestamp('woUpdatedate').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('wohistory')
    .dropTableIfExists('workorders')
    .dropTableIfExists('tenanthistory')
    .dropTableIfExists('properties')
    .dropTableIfExists('users');
};
