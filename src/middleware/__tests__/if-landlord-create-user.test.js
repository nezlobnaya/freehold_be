describe('work order controller test', () => {
  it('should work', () => {
    expect('test').toBe('test')
  })
})

// const ifLandlordCreateUser = require('../if-landlord-create-user')

// const {Db, Models, Express} = require('../../test-utils')

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// it('should call next if user is not a landlord', async () => {
//   const user = Models.createTenant()
//   const req = Express.mockRequest({body: user})
//   const res = Express.mockResponse()
//   const next = jest.fn()

//   await ifLandlordCreateUser(req, res, next)

//   expect(next).toHaveBeenCalledTimes(1)
// })

// it('should create the user if it is a landlord', async () => {
//   const user = Models.createLandlord()
//   const req = Express.mockRequest({body: user})
//   const res = Express.mockResponse()
//   const next = jest.fn()

//   await ifLandlordCreateUser(req, res, next)
//   const users = await Db.getAllUsers()

//   expect(users.length).toBe(1)
//   expect(req.user).toEqual(
//     expect.objectContaining({email: user.email, type: user.type}),
//   )
// })
