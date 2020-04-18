const PaymentsController = require('./payments-controller')
const PaymentsModel = require('../../models/payments/payments-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/payments/payments-model')

let req, res, next
const mockPayment = {
  unit_id: 1,
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyD3',
  type: 1,
  amount: 1000,
  payment_date: '2020-4-18',
  late: false,
  due_date: 15,
}
const mockPaymentId = 1

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('PaymentsController.create', () => {
  it('should be a function', () => {
    expect(typeof PaymentsController.create).toBe('function')
  })

  it('should call PaymentsModel.add with req.body', async () => {
    req.body = mockPayment
    await PaymentsController.create(req, res, next)
    expect(PaymentsModel.add).toHaveBeenCalledWith(mockPayment)
  })

  it('should return status 200 and json data', async () => {
    req.body = mockPayment
    PaymentsModel.add.mockReturnValue(mockPayment)
    await PaymentsController.create(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockPayment)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot create payment'}
    const rejectedPromise = Promise.reject(errorMessage)

    PaymentsModel.add.mockReturnValue(rejectedPromise)
    await PaymentsController.create(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('PaymentsController.getPayment', () => {
  it('should be a function', () => {
    expect(typeof PaymentsController.getPayment).toBe('function')
  })

  it('should call PaymentsModel.getById', async () => {
    req.params.id = mockPaymentId
    await PaymentsController.getPayment(req, res, next)
    expect(PaymentsModel.getById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    req.params.id = mockPaymentId
    PaymentsModel.getById.mockReturnValue(mockPayment)
    await PaymentsController.getPayment(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockPayment)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'could not get payment'}
    const rejectedPromise = Promise.reject(errorMessage)

    PaymentsModel.getById.mockReturnValue(rejectedPromise)
    await PaymentsController.getPayment(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    PaymentsModel.getById.mockReturnValue(null)
    await PaymentsController.getPayment(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
