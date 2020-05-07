const MediaController = require('./media-controller')
const MediaModel = require('../../models/media/media-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/media/media-model')

let req, res, next
const {mockMedia, mockMediaId} = require('../../test-utils/mock-data')

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('MediaController.create', () => {
  it('should be a function', () => {
    expect(typeof MediaController.create).toBe('function')
  })

  it('should call Media.addMedia', async () => {
    await MediaController.create(req, res, next)
    expect(MediaModel.addMedia).toHaveBeenCalledWith(req.body)
  })

  it('should return status 200 and json data', async () => {
    MediaModel.addMedia.mockReturnValue(mockMedia)
    await MediaController.create(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockMedia)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot create media'}
    const rejectedPromise = Promise.reject(errorMessage)

    MediaModel.addMedia.mockReturnValue(rejectedPromise)
    await MediaController.create(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('MediaController.getById', () => {
  it('should be a function', () => {
    expect(typeof MediaController.getById).toBe('function')
  })

  it('should call MediaModel.getMediaById', async () => {
    req.params.id = mockMediaId
    await MediaController.getById(req, res, next)
    expect(MediaModel.getMediaById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    MediaModel.getMediaById.mockReturnValue(mockMedia)
    await MediaController.getById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockMedia)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get media data'}
    const rejectedPromise = Promise.reject(errorMessage)

    MediaModel.getMediaById.mockReturnValue(rejectedPromise)
    await MediaController.getById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    MediaModel.getMediaById.mockReturnValue(null)
    await MediaController.getById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('MediaController.update', () => {
  it('should be a function', () => {
    expect(typeof MediaController.update).toBe('function')
  })

  it('should call MediaModel.updateMedia with changes and id', async () => {
    req.params.id = mockMediaId
    req.body = mockMedia
    await MediaController.update(req, res, next)
    expect(MediaModel.updateMedia).toHaveBeenCalledWith(req.body, req.params.id)
  })

  it('should return status 200 and json data', async () => {
    MediaModel.updateMedia.mockReturnValue(mockMedia)
    await MediaController.update(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockMedia)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot update media'}
    const rejectedPromise = Promise.reject(errorMessage)

    MediaModel.updateMedia.mockReturnValue(rejectedPromise)
    await MediaController.update(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    MediaModel.updateMedia.mockReturnValue(null)
    await MediaController.update(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('MediaController.findAnddelete', () => {
  it('should be a function', () => {
    expect(typeof MediaController.deleteMedia).toBe('function')
  })

  it('should call MediaModel.deleteMedia with id', async () => {
    req.params.id = mockMediaId
    await MediaController.deleteMedia(req, res, next)
    expect(MediaModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    req.params.id = mockMediaId
    MediaModel.findByIdAndDelete.mockReturnValue(mockMedia)
    await MediaController.deleteMedia(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(mockMedia)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot delete media'}
    const rejectedPromise = Promise.reject(errorMessage)

    MediaModel.findByIdAndDelete.mockReturnValue(rejectedPromise)
    await MediaController.deleteMedia(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})
