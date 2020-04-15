const db = require('../../../database/db')

const addMedia = async input => {
  const [results] = await db('media').insert(input).returning('*')
  return results
}

const getMediaById = async id => {
  const media = await db('media').where({id}).first('*')
  return media
}

module.exports = {
  addMedia,
  getMediaById,
}
