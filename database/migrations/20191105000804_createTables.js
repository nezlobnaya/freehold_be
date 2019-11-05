
exports.up = function(knex) {
  return knex.schema
  
  // users
  .createTable("users", tbl => {
    tbl.increments();
    tbl.string('username').notNullable().unique();
    tbl.string('password').notNullable();
    tbl.json("name").notNullable();
    tbl.string('email').notNullable().unique();
    tbl.json("address");
    tbl.string('type').notNullable();
    tbl.string('phone');
  })
  
  // properties
  .createTable("properties", tbl => {
    tbl.increments();
    tbl.string('property-name').notNullable();
    tbl.json('property-address').notNullable();
    tbl.string('property-image');
    tbl.string('property-status');
    tbl.date('property-startdate');
    tbl.date('property-enddate');
    tbl.integer('landlord-id').unsigned()
      .references('id').inTable('users');
  })
  
  // tenanthistory
  .createTable("tenanthistory", tbl => {
    tbl.increments();
    tbl.integer('tenant-id').unsigned()
      .references('id').inTable('users');
    tbl.integer('property-id').unsigned()
      .references('id').inTable('properties');
    tbl.date('history-startdate');
    tbl.date('history-enddate');
  })
  
  // workorders
  .createTable("workorders", tbl => {
    tbl.increments();
    tbl.string('workorder').notNullable().unique();
    tbl.text("wo-description").notNullable();
    tbl.string("wo-type").notNullable();
    tbl.date("wo-startdate").notNullable();
    tbl.date("wo-enddate");
    tbl.integer('property-id').unsigned()
      .references('id').inTable('properties');
  })
  
  // wohistory
  .createTable("wohistory", tbl => {
    tbl.increments();
    tbl.integer('wo-id').unsigned()
      .references('id').inTable('workorders');
    tbl.string('wo-status');
    tbl.string('wo-urgency');
    tbl.string('wo-update');
    tbl.timestamp('wo-updatedate');
    tbl.string('wo-assignedto');
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
