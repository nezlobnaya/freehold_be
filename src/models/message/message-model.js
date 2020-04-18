const db = require('../../../database/db')

const add = async input => {
  const message = await db('message').insert(input).returning('*')

  return message
}

const getById = async id => {
  const [message] = await db('message').where({id}).returning('*')

  return message
}

const getConversationById = async id => {
  const conversation = await db('message')
    .where({conversation_id: id})
    .returning('*')

  return conversation
}

module.exports = {
  add,
  getById,
  getConversationById,
}
