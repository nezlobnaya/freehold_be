const db = require('../../../database/db')

const table = 'workorders'

module.exports = {
  // Create
  add,
  // Read
  get,
  getById,
  // Update
  update,
  // Delete
  remove
}

//#region - CREATE

async function add(input, userId) {
  const results = await db(table)
    .returning('id')
    .insert({...input})
  return get(results[0])
}

//#endregion

//#region - READ

async function get() {
  const [results] = await db
    .from(table)
    .select('*')

  return results || null
}

async function getById(id) {
  const [results] = await db
    .from(table)
    .select('*')
    .where({id})

  return results || null
}

//#endregion

//#region - Update

async function update(changes, id) {
  const [results] = await db
    .from(table)
    .update(changes)
    .where({id})
    .returning('*')

  return results ? {updated: true, results} : {updated: false}
}

//#endregion

//#region - Delete

async function remove(id) {
  const results = await db(table)
    .where({id})
    .del()

  return results === 1 ? {deleted: true} : {deleted: false}
}

//#endregion
