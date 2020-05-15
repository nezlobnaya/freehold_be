const UnitController = require('./unit-controller')
const UnitModel = require('../../models/unit/unit-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/unit/unit-model')

let req, res, next
const {mockUnit, unitId} = require('../../test-utils/mock-data')

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

// Tests for creating a unit
describe('UnitController.create', () => {
  it('should be function', () => {
    expect(typeof UnitController.create).toBe('function')
  })

  it('should call UnitModel.addUnit()', async () => {
    await UnitController.create(req, res, next)
    expect(UnitModel.addUnit).toHaveBeenCalled()
  })

  it('should return 201 res code and the created unit', async () => {
    UnitModel.addUnit.mockReturnValue(mockUnit)
    await UnitController.create(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockUnit)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'missing unit data'}
    const rejectedPromise = Promise.reject(errorMessage)

    UnitModel.addUnit.mockReturnValue(rejectedPromise)
    await UnitController.create(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})

// Tests for getting a unit by id
describe('UnitController.getById', () => {
  it('should have a getById function', () => {
    expect(typeof UnitController.getById).toBe('function')
  })

  it('should call UnitModel.getUnitById(id)', async () => {
    req.params.id = unitId
    await UnitController.getById(req, res, next)
    expect(UnitModel.getUnitById).toHaveBeenCalledWith(unitId)
  })

  it('should return res code 200 and json body', async () => {
    UnitModel.getUnitById.mockReturnValue(mockUnit)
    await UnitController.getById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(mockUnit)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'unit not found'}
    const rejectedPromise = Promise.reject(errorMessage)

    UnitModel.getUnitById.mockReturnValue(rejectedPromise)
    await UnitController.getById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should return 404 when unit doesnt exist', async () => {
    UnitModel.getUnitById.mockReturnValue(null)
    await UnitController.getById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

// Tests for getting all units
describe('UnitController.getAll', () => {
  it('should have a getAll function', () => {
    expect(typeof UnitController.getAll).toBe('function')
  })

  it('should call UnitModel.getAllUnits', async () => {
    await UnitController.getAll(req, res, next)
    expect(UnitModel.getAllUnits).toHaveBeenCalled()
  })

  it('should return status 200 and json data', async () => {
    UnitModel.getAllUnits.mockReturnValue([mockUnit, mockUnit])
    await UnitController.getAll(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get units'}
    const rejectedPromise = Promise.reject(errorMessage)

    UnitModel.getAllUnits.mockReturnValue(rejectedPromise)
    await UnitController.getAll(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

// Tests for updating units
describe('UnitController.update', () => {
  it('should have an update function', () => {
    expect(typeof UnitController.update).toBe('function')
  })

  it('should call UnitModel.updateUnit', async () => {
    req.params.id = unitId
    req.body = mockUnit
    await UnitController.update(req, res, next)
    expect(UnitModel.updateUnit).toHaveBeenCalledWith(req.body, req.params.id)
  })

  it('should return status 200 and json data', async () => {
    req.params.id = unitId
    req.body = mockUnit
    UnitModel.updateUnit.mockReturnValue(mockUnit)
    await UnitController.update(req, res, next)
    expect(res._isEndCalled).toBeTruthy()
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(mockUnit)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot update unit'}
    const rejectedPromise = Promise.reject(errorMessage)
    UnitModel.updateUnit.mockReturnValue(rejectedPromise)
    await UnitController.update(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404 errors', async () => {
    UnitModel.updateUnit.mockReturnValue(null)
    await UnitController.update(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled).toBeTruthy()
  })
})

//
