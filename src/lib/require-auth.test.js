describe('work order controller test', () => {
  it('should work', () => {
    expect('test').toBe('test')
  })
})

// const requireAuth = require('./require-auth')
// const {Express} = require('../test-utils')

// describe('requireAuth', () => {
//   it('should call next if a user is provided', () => {
//     const req = Express.mockRequest({user: {name: 'george'}})
//     const res = Express.mockResponse()
//     const next = jest.fn()

//     requireAuth(req, res, next)

//     expect(next).toHaveBeenCalledTimes(1)
//   })
//   it('should send a status of 401 if no user is provided', () => {
//     const req = Express.mockResponse()
//     const res = Express.mockResponse()
//     const next = jest.fn()

//     requireAuth(req, res, next)

//     expect(res.sendStatus).toHaveBeenCalledWith(401)
//   })
// })
