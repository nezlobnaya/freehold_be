const db = require("../../../database/db");

const table = "users as u";

const landlordReturning = [
  "id",
  "firstName",
  "lastName",
  "type",
  "phone",
  "email"
];

async function create(input, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .insert(input)
    .returning(returning);

  return user || null;
}

function createTenant(input) {
  return create(input, "*");
}

async function findByEmail(email, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .select(returning)
    .where({ email });

  return user || null;
}

async function findById(id, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .select(returning)
    .where({ id });

  return user || null;
}

function findTenantById(id) {
  return findById(id, "*");
}

async function updateByEmail(email, update, returning = landlordReturning) {
  const [user] = await db
    .from(table)
    .update(update)
    .where({ email })
    .returning(returning);

  return user ? { updated: true, user } : { updated: false };
}

function getAllTenantsByPropertyId(id) {
  return db
    .from(table)
    .select("*")
    .where({ residenceId: id });
}

function getAllTenantsByLandlordId(id) {
  return db
    .from(table)
    .select("*")
    .where({ landlordId: id });
}

module.exports = {
  create,
  createTenant,
  findByEmail,
  findById,
  findTenantById,
  updateByEmail,
  getAllTenantsByPropertyId,
  getAllTenantsByLandlordId
};
