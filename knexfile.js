// Update with your config settings.

require("dotenv").config({ path: `./.env.${process.env.NODE_ENV || "dev"}` });

module.exports = {
  development: {
    client: "pg",
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },
    connection: {
      host: process.DB_HOST,
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "postgres"
    },
    ssl: true,
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
