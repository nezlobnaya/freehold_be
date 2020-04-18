const express = require('express')
const MessageController = require('../../controllers/message/message-controller')

const router = express.Router()

router.post('/', MessageController.create)
router.get('/:id', MessageController.getMessage)
router.get('/conversation/:id', MessageController.getConversation)

module.exports = router
