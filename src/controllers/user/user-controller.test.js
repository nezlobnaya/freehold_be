const UserController = require('./user-controller')
const UserModel = require('../../models/user/')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/user/user-model')

let req, res, next, updated
const {mockUser, decodedToken} = require('../../test-utils/mock-data')

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('UserController.getCurrent', () => {
  it('should be a function', () => {
    expect(typeof UserController.getCurrent).toBe('function')
  })

  it('should call UserModel.findById', async () => {
    req.decodedToken = decodedToken
    await UserController.getCurrent(req, res, next)
    expect(UserModel.findById).toHaveBeenCalledWith(req.decodedToken.user_id)
  })

  it('should return 200 and json data', async () => {
    req.decodedToken = decodedToken
    UserModel.findById.mockReturnValue(mockUser)
    await UserController.getCurrent(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockUser)
  })

  it('should handle 404', async () => {
    req.decodedToken = decodedToken
    UserModel.findById.mockReturnValue(null)
    await UserController.getCurrent(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors', async () => {
    req.decodedToken = decodedToken
    const errorMessage = {message: 'couldnt get current user'}
    const rejectedPromise = Promise.reject(errorMessage)

    UserModel.findById.mockReturnValue(rejectedPromise)
    await UserController.getCurrent(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('UserController.updateCurrent', () => {
  it('should be a function', () => {
    expect(typeof UserController.updateCurrent).toBe('function')
  })

  it('should call UserModel.updateByEmail', async () => {
    req.user = mockUser
    req.body = mockUser
    await UserController.updateCurrent(req, res, next)
    expect(UserModel.updateByEmail).toHaveBeenCalledWith(
      req.user.email,
      req.body,
    )
  })

  it('should return status 200', async () => {
    req.user = mockUser
    req.body = mockUser
    updated = true
    UserModel.updateByEmail.mockReturnValue({mockUser, updated})
    await UserController.updateCurrent(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors', async () => {
    req.user = mockUser
    req.body = mockUser
    updated = false

    UserModel.updateByEmail.mockReturnValue({mockUser, updated})
    await UserController.updateCurrent(req, res, next)
    expect(res.statusCode).toBe(500)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
