const MessageModel = require('../../models/message/message-model')

const create = async (req, res, next) => {
  try {
    const message = await MessageModel.add(req.body)
    res.status(200).json(message)
  } catch (err) {
    next(err)
  }
}

const getMessage = async (req, res, next) => {
  try {
    const message = await MessageModel.getById(req.params.id)

    if (!message) {
      res.status(404).json({message: 'message not found'})
    } else {
      res.status(200).json(message)
    }
  } catch (err) {
    next(err)
  }
}

const getConversation = async (req, res, next) => {
  {
    try {
      const conversation = await MessageModel.getConversationById(req.params.id)
      if (!conversation) {
        res.status(404).json({message: 'conversation not found'})
      } else {
        res.status(200).json(conversation)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  create,
  getMessage,
  getConversation,
}
