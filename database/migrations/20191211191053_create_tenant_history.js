exports.up = function(knex) {
  // tenanthistory
  return knex.schema.createTable("tenanthistory", tbl => {
    tbl.increments();
    tbl
      .integer("tenantId")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable();
    tbl
      .integer("propertyId")
      .unsigned()
      .references("id")
      .inTable("properties")
      .notNullable();
    tbl.date("startDate").notNullable();
    tbl.date("endDate");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tenanthistory");
};
