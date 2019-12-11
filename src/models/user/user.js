const db = require("../../../database/db");

const table = "users as u";

async function create(input) {
  const [user] = await db
    .from(table)
    .insert(input)
    .returning("*");

  return user || null;
}

async function findByEmail(email) {
  const [user] = await db
    .from(table)
    .select("*")
    .where({ email });

  return user || null;
}

async function updateByEmail(email, update) {
  const [user] = await db
    .from(table)
    .update(update)
    .where({ email })
    .returning("*");

  return user ? { updated: true, user } : { updated: false };
}

module.exports = {
  create,
  findByEmail,
  updateByEmail
};
