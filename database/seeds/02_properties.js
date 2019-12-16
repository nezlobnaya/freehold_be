const { seedProperties } = require("../../src/lib/db-helpers");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("properties").insert(seedProperties);
};

