const ifNoPropertyNext = require('../if-no-property-next')
const httpMocks = require('node-mocks-http')
const Property = require('../../models/unit/unit-model')

jest.mock('../../models/unit/unit-model')

let req, res, next
const mockProperty = {
	"name": "second test unit",
	"street_address": "543 st",
	"city": "virtual",
	"state": "space",
	"zip": "12345",
	"occupied": 0,
	"rent": 1000
}

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('ifNoPropertyNext middleware', () => {
    it('should be a function', () => {
        expect(typeof ifNoPropertyNext).toBe('function')
    })

    it('should call Property.getUnitByAddress', async () => {
        req.body = mockProperty
        await ifNoPropertyNext(req, res, next)
        expect(Property.getUnitByAddress).toHaveBeenCalledWith(req.body.street_address)
    })

    it('should call next', async () => {
        Property.getUnitByAddress.mockReturnValue(null)
        await ifNoPropertyNext(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    it('should handle errors', async () => {
        const errorMessage = {message: 'cant get property'}
        const rejectedPromise = Promise.reject(errorMessage)

        Property.getUnitByAddress.mockReturnValue(rejectedPromise)
        await ifNoPropertyNext(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

    it('should handle 403', async () => {
        Property.getUnitByAddress.mockReturnValue(mockProperty)
        await ifNoPropertyNext(req, res, next)
        expect(res.statusCode).toBe(403)
    })
})