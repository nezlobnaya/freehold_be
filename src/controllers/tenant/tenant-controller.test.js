const TenantController = require('./tenant-controller')
const UserModel = require('../../models/user')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/user/user-model')

let req, res, next
const landlordId = 'Je1JoLNS6Ee4o8qHjfH7bmRocyi3'
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('TenantController.getByLandlord', () => {
  it('should be a function', () => {
    expect(typeof TenantController.getByLandlord).toBe('function')
  })

  it('should call UserModel.getTenantByLandlord', async () => {
    req.params.id = landlordId
    await TenantController.getByLandlord(req, res, next)
    expect(UserModel.getTenantsByLandlord).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', () => {})

  it('should handle errors', async () => {
    const errorMessage = {message: 'cant get tenants'}
    const rejectedPromise = Promise.reject(errorMessage)

    UserModel.getTenantsByLandlord.mockReturnValue(rejectedPromise)
    await TenantController.getByLandlord(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    UserModel.getTenantsByLandlord.mockReturnValue(null)
    await TenantController.getByLandlord(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('TenantController.getByUnit', () => {
  it('should be a function', () => {
    expect(typeof TenantController.getByUnit).toBe('function')
  })

  it('should call UserModel.getTenantsByUnit', async () => {
    await TenantController.getByUnit(req, res, next)
    expect(UserModel.getTenantsByUnit).toHaveBeenCalled()
  })

  it('should return 200 and json data', () => {})

  it('should handle errors', async () => {
    const errorMessage = {message: 'cant get tenants'}
    const rejectedPromise = Promise.reject(errorMessage)

    UserModel.getTenantsByUnit.mockReturnValue(rejectedPromise)
    await TenantController.getByUnit(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    UserModel.getTenantsByUnit.mockReturnValue(null)
    await TenantController.getByUnit(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
