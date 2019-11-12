const db = require('../../database/db-config.js');
const cleaner = require("knex-cleaner");

module.exports = {
  dbReset,
}

async function dbReset(){
  cleaner.clean(db, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });

  try {

    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();

  } catch(err) {
    console.log(err)
  }

}