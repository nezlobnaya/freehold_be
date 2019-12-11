const pg =  require("pg")
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function close() {
  return pool.end()
}

module.exports = {
    close
};