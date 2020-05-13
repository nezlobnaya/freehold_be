const MessageController = require('./message-controller')
const MessageModel = require('../../models/message/message-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/message/message-model')

let req, res, next
const {
  mockMessage,
  mockConversation,
  mockMessageId,
  mockConversationId,
} = require('../../test-utils/mock-data')

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('MessageController.create', () => {
  it('should be a function', () => {
    expect(typeof MessageController.create).toBe('function')
  })

  it('should call MessageModel.add', async () => {
    req.body = mockMessage
    await MessageController.create(req, res, next)
    expect(MessageModel.add).toHaveBeenCalledWith(mockMessage)
  })

  it('should return status 200 and json data', async () => {
    req.body = mockMessage
    MessageModel.add.mockReturnValue(mockMessage)
    await MessageController.create(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockMessage)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot create message'}
    const rejectedPromise = Promise.reject(errorMessage)

    MessageModel.add.mockReturnValue(rejectedPromise)
    await MessageController.create(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('MessageController.getMessage', () => {
  it('should be a function', () => {
    expect(typeof MessageController.getMessage).toBe('function')
  })

  it('should call MessageModel.getById with id', async () => {
    req.params.id = mockMessageId
    await MessageController.getMessage(req, res, next)
    expect(MessageModel.getById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    req.params.id = mockMessageId
    MessageModel.getById.mockReturnValue(mockMessage)

    await MessageController.getMessage(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockMessage)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get message'}
    const rejectedPromise = Promise.reject(errorMessage)

    MessageModel.getById.mockReturnValue(rejectedPromise)
    await MessageController.getMessage(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    MessageModel.getById.mockReturnValue(null)
    await MessageController.getMessage(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('MessageController.getConversation', () => {
  it('should be a function', () => {
    expect(typeof MessageController.getConversation).toBe('function')
  })

  it('should call MessageModel.getConversationById with id', async () => {
    req.params.id = mockConversationId
    await MessageController.getConversation(req, res, next)
    expect(MessageModel.getConversationById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    req.params.id = mockConversationId
    MessageModel.getConversationById.mockReturnValue(mockConversation)

    await MessageController.getConversation(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockConversation)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get conversation'}
    const rejectedPromise = Promise.reject(errorMessage)

    MessageModel.getConversationById.mockReturnValue(rejectedPromise)
    await MessageController.getConversation(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    MessageModel.getConversationById.mockReturnValue(null)
    await MessageController.getConversation(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
