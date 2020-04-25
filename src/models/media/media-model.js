const db = require('../../../database/db')

const addMedia = async input => {
  const [results] = await db('media').insert(input).returning('*')
  return results
}

const getMediaById = async id => {
  const media = await db('media').where({id}).first('*')
  return media
}

const updateMedia = async (changes, id) => {
  const [updatedMedia] = await db('media')
    .where({id})
    .update(changes)
    .returning('*')

  return updatedMedia
}

const findByIdAndDelete = async id => {
  const deleted = await db('media').where({id}).del()

  return deleted
}

module.exports = {
  addMedia,
  getMediaById,
  updateMedia,
  findByIdAndDelete,
}
