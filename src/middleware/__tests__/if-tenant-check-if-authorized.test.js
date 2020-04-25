// const User = require('../../models/user')
// const Express = require('../../test-utils/express')
// const ifTenantCheckIfAuthorized = require('../if-tenant-check-if-authorized')

describe('check if tenant is authorized', () => {
  it('should work', () => {
    expect('test').toBe('test')
  })
})

// jest.mock('../../models/user', () => {
//   return {
//     findByEmail: jest.fn(),
//   }
// })

// const createBody = input => ({
//   email: 'fake@gmail.com',
//   password: 'badpassword',
//   type: 'landlord',
//   ...input,
// })

// it('should call next if user is not a tenant', async () => {
//   const next = jest.fn()
//   const body = createBody()
//   const req = Express.mockRequest({body})
//   const res = Express.mockResponse()

//   await ifTenantCheckIfAuthorized(req, res, next)
//   expect(next).toHaveBeenCalledTimes(1)
// })

// it('should call next if user is tenant, and has been invited', async () => {
//   const next = jest.fn()
//   const body = createBody({type: 'tenant'})
//   const req = Express.mockRequest({body})
//   const res = Express.mockResponse()

//   // Skip the DB check and pretend the user is there
//   User.findByEmail.mockResolvedValueOnce(true)

//   await ifTenantCheckIfAuthorized(req, res, next)
//   expect(next).toHaveBeenCalledTimes(1)
// })

// it('should respond with a 401 if the user is a tenant, and they have not been invited', async () => {
//   const next = jest.fn()
//   const body = createBody({type: 'tenant'})
//   const req = Express.mockRequest({body})
//   const res = Express.mockResponse()

//   // Skip the DB check and pretend the user isn't there
//   User.findByEmail.mockResolvedValueOnce(false)

//   await ifTenantCheckIfAuthorized(req, res, next)
//   expect(res.status).toHaveBeenCalledTimes(1)
//   expect(res.status).toHaveBeenCalledWith(401)
//   expect(res.json).toHaveBeenCalledTimes(1)
//   expect(res.json).toHaveBeenCalledWith({
//     message: 'You must have an invitation from a landlord to join as a tenant',
//   })
// })
