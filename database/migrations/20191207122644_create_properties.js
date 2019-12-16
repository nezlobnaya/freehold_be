exports.up = function(knex) {
  return knex.schema.createTable("properties", tbl => {
    // unique id
    tbl.increments();

    tbl.string("name").notNullable();
    tbl.string("street").notNullable();
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.string("zip").notNullable();

    tbl.enum("status", ["vacant", "occupied"]).notNullable();

    tbl.string("image");
    tbl
      .integer("landlordId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("properties");
};
