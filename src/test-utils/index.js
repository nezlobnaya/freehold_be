const db = require("../../database/db-config");
const cleaner = require("knex-cleaner");

exports.resetDb = async () => {
  try {
    await cleaner.clean(db, {
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    });
  } catch (err) {
    console.error(err);
  }
};

exports.destroyDbConn = async () => {
  await db.destroy();
};

exports.userFactory = input => ({
  firstName: "Matt",
  lastName: "Hagner",
  street: "123 Test Ln",
  city: "Test City",
  state: "MN",
  zip: "55555",
  email: "test@gmail.com",
  type: "dev",
  phone: "1238675309",
  ...input
});

exports.insertUser = user => db.from("users").insert(user);
exports.getAllUsers = () => db.from("users");
