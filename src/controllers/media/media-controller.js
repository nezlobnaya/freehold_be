const Media = require('../../models/media/media-model')

const create = async (req, res, next) => {
  try {
    const input = req.body
    const media = await Media.addMedia(input)
    res.status(200).json(media)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id)
    const media = await Media.getMediaById(mediaId)

    if (!media) {
      res.status(404).json({message: 'media not found'})
    } else {
      res.status(200).json(media)
    }
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id)
    const changes = req.body
    const updatedMedia = await Media.updateMedia(changes, mediaId)

    if (!updatedMedia) {
      res.status(404).json({message: 'media not found'})
    } else {
      res.status(200).json(updatedMedia)
    }
  } catch (err) {
    next(err)
  }
}

const deleteMedia = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id)
    const deleted = await Media.findByIdAndDelete(mediaId)

    if (!deleted) {
      res.status(404).json({message: 'media not found'})
    } else {
      res.status(200).json(deleted)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getById,
  update,
  deleteMedia,
}
