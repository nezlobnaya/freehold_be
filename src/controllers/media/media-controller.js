const Media = require('../../models/media/media-model')

const create = async (req, res, next) => {
  try {
    const media = await Media.addMedia(req.body)
    res.status(200).json(media)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id)
    const media = await Media.getMediaById(mediaId)
    res.status(200).json(media)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getById,
}
