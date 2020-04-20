const db = require('../../../database/db')

const add = async input => {
  const [payment] = await db('payments').insert(input).returning('*')

  return payment
}

const getById = async id => {
  const payment = await db('payments').where({id}).first('*')

  return payment
}

module.exports = {
  add,
  getById,
}
