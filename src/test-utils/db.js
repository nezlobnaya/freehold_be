const db = require("../../database/db");
const cleaner = require("knex-cleaner");

const reset = async () => {
  try {
    await cleaner.clean(db, {
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    });
  } catch (err) {
    console.error(err);
  }
};

const destroyConn = async () => {
  await db.destroy();
};

const insertResourceIntoTable = tableName => resource =>
  db
    .from(tableName)
    .insert(resource)
    .returning("*");

const insertUsers = insertResourceIntoTable("users as u");
const getAllUsers = () => db.from("users as u");
const getAllProperties = () => db.from("properties as p");
const insertProperties = insertResourceIntoTable("properties as p");

module.exports = {
  destroyConn,
  getAllProperties,
  getAllUsers,
  insertProperties,
  insertUsers,
  reset
};
