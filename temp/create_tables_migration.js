exports.up = function(knex) {
  return (
    knex.schema

      // users
      .createTable("users", tbl => {
        tbl.increments();
        tbl.string("firstName");
        tbl.string("lastName");
        tbl
          .string("email")
          .notNullable()
          .unique();

        tbl.string("street");
        tbl.string("city");
        tbl.string("state");
        tbl.string("zip");
        tbl.enu("type", ["landlord", "tenant", "dev"]).notNullable();
        tbl.string("phone");
      })

      // properties
      .createTable("properties", tbl => {
        tbl.increments();

        tbl.string("name").notNullable();

        // Address related fields
        tbl.string("street").notNullable();
        tbl.string("city").notNullable();
        tbl.string("state").notNullable();
        tbl.string("zip").notNullable();

        tbl.string("image");
        tbl.enum("status", ["vacant", "occupied"]).notNullable();

        tbl.date("propertyStartdate");
        tbl.date("propertyEnddate");

        tbl
          .integer("landlordId")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
          .notNullable();
      })

      // MOVE INTO OWN MIGRATION
      // .createTable('leases', leases => {
      //   leases.increments();

      //   leases.integer('propertyId').unsigned().references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE').notNullable();
      // })

      // tenanthistory
      .createTable("tenanthistory", tbl => {
        tbl.increments();
        tbl
          .integer("tenantId")
          .unsigned()
          .references("id")
          .inTable("users");
        tbl
          .integer("propertyId")
          .unsigned()
          .references("id")
          .inTable("properties");
        tbl.date("historyStartdate");
        tbl.date("historyEnddate");
      })

      // workorders
      .createTable("workorders", tbl => {
        tbl.increments();
        tbl.string("title").notNullable();
        tbl.text("description").notNullable();
        tbl.string("type").notNullable();
        tbl.date("startDate").notNullable();
        tbl.date("endDate");
        tbl
          .integer("propertyId")
          .unsigned()
          .references("id")
          .inTable("properties")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
          .notNullable();
        tbl
          .integer("createdBy")
          .unsigned()
          .references("id")
          .inTable("users")
          .notNullable();
      })

      // wohistory
      .createTable("wohistory", tbl => {
        tbl.increments();
        tbl
          .integer("woId")
          .unsigned()
          .references("id")
          .inTable("workorders")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl.string("woStatus");
        tbl.integer("woUrgency");
        tbl.json("woUpdate");
        tbl.timestamp("woUpdatedate").defaultTo(knex.fn.now());
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("wohistory")
    .dropTableIfExists("workorders")
    .dropTableIfExists("tenanthistory")
    .dropTableIfExists("properties")
    .dropTableIfExists("users");
};
