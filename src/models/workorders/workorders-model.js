// const Property = require('../property')
// const User = require('../user')
// // Work Order Models
const db = require('../../../database/db')
const fireAdmin = require('../../lib/firebase')
// const {omit, map, pipeP} = require('ramda')

// const table = 'workorders as w'

// async function getDetails(workorder) {
//   try {
//     const property = await Property.getProperty(workorder.propertyId)
//     const user = await User.findById(workorder.createdBy, '*')
//     const intermediate = omit(['propertyId', 'createdBy'], workorder)

//     return {...intermediate, property, createdBy: user}
//   } catch (err) {
//     console.error(err)
//   }
// }

// const getAllDetails = pipeP(map(getDetails))

// //#region - CREATE

const add = async input => {
  const workorder = await db('work_order').insert(input).returning('*')

  return workorder || null
}

// //#endregion

// //#region - READ

// async function get() {
//   const results = await db.from(table).select('*')

//   return results || null
// }

async function getById(id) {
  const results = await db('work_order').where({id}).select('*')

  //   const [workorder] = await getAllDetails(results)

  return results || null
}

// function getAllByPropertyId(propertyId) {
//   return getBy({propertyId})
// }

async function getAll(decodedToken) {
  const results = await db('work_order')
    .select('*')
    .where({user_id: decodedToken.user_id})
  // console.log(results)
  const workordersWithUserInfo = await Promise.all(
    results.map(async workOrders => {
      const getDisplayName = await fireAdmin.auth().getUser(workOrders.user_id)
      workOrders.user_id = getDisplayName.displayName || getDisplayName.email
      return workOrders
    }),
  )
  return workordersWithUserInfo || null
}

// async function getBy(query) {
//   const results = await db
//     .from(table)
//     .select('*')
//     .where(query)

//   return results || null
// }

// //#endregion

// //#region - Update

function update(id, changes) {
  return db('work_order').where({id}).update(changes).returning('*')
}

// //#endregion

// //#region - Delete

// async function remove(id) {
//   const results = await db(table)
//     .where({id})
//     .del()

//   return results === 1 ? {deleted: true} : {deleted: false}
// }

// //#endregion
module.exports = {
  add,
  //   get,
  //   getBy,
  getAll,
  getById,
  //   getAllByPropertyId,
  update,
  //   remove,
}
