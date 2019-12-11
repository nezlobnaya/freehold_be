module.exports = {
  dbReset,
  close
}

// knex
const db = require('../../database/db-config.js');
const cleaner = require("knex-cleaner");

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

// pg
const pg =  require("pg")
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function close() {
  return pool.end()
}