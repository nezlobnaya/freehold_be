const db = require("../../../database/db");

const table = "users as u";

async function create(
  input,
  returning = ["id", "firstName", "lastName", "type", "phone", "email"]
) {
  const [user] = await db
    .from(table)
    .insert(input)
    .returning(returning);

  return user || null;
}

function createTenant(input) {
  return create(input, "*");
}

async function findByEmail(email) {
  const [user] = await db
    .from(table)
    .select("*")
    .where({ email });

  return user || null;
}

async function findById(id) {
  const [user] = await db
    .from(table)
    .select("*")
    .where({ id });

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
  createTenant,
  findByEmail,
  findById,
  updateByEmail
};
