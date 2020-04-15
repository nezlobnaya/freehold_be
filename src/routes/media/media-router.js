const express = require('express')
const MediaController = require('../../controllers/media/media-controller')

const router = express.Router()

router.post('/', MediaController.create)

router.get('/:id', MediaController.getById)

module.exports = router
