const AuthController = require('./auth-controller')
const UserModel = require('../../models/user/user-model')
// const firebase = require('../../lib/firebase')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/user/user-model')

let req, res, token
const decodedToken = {landlord: true, user_id: 'jkl1234'}

beforeEach(() => {
  res = httpMocks.createResponse()
  req = httpMocks.createRequest()
})

describe('AuthController.createLandlordUser', () => {
  it('should be a function', () => {
    expect(typeof AuthController.createLandlordUser).toBe('function')
  })
})

describe('AuthController.createTenantUser', () => {
  it('should be a function', () => {
    expect(typeof AuthController.createTenantUser).toBe('function')
  })
})

describe('AuthController.login', () => {
  it('should be a function', () => {
    expect(typeof AuthController.login).toBe('function')
  })

  it('should call User.findById', async () => {
    req.decodedToken = decodedToken
    req.token = token
    await AuthController.login(req, res)
    expect(UserModel.findById).toHaveBeenCalledWith(req.decodedToken.user_id)
  })

  it('should handle errors', async () => {
    const errorMessage = {error: 'Invalid credentials'}
    const rejectedPromise = Promise.reject(errorMessage)
    UserModel.findById.mockReturnValue(rejectedPromise)

    req.decodedToken = decodedToken
    req.token = token
    await AuthController.login(req, res)
    expect(res.statusCode).toBe(401)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(errorMessage)
  })
})
// const {createUser, login} = require('./')
// const {Express, Db, Models} = require('../../test-utils')
// const firebase = require('../../lib/firebase')

// const mockRequest = input =>
//   Express.mockRequest({
//     body: {
//       email: 'test@gmail.com',
//       password: '123',
//     },
//     ...input,
//   })

// const mockExpress = (req, res) => ({
//   req: mockRequest(req),
//   res: Express.mockResponse(res),
// })

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// describe.skip('createUser', () => {
//   it('should return a 201 on success', async () => {
//     const user = Models.createLandlord()
//     await Db.insertUsers([user])

//     const {req, res} = mockExpress({body: {email: user.email}, user: user})

//     firebase.createUserWithEmailAndPassword.mockResolvedValue({
//       user: firebase.user,
//     })

//     await createUser(req, res)

//     expect(res.status).toHaveBeenCalledWith(201)
//   })

//   it('should send a token on success', async () => {
//     const {req, res} = mockExpress({user: {}})
//     const expected = {
//       token: expect.any(String),
//       user: {
//         email: req.body.email,
//       },
//     }

//     firebase.createUserWithEmailAndPassword.mockResolvedValue({
//       user: firebase.user,
//     })

//     await createUser(req, res)

//     expect(res.json).toHaveBeenCalledTimes(1)
//     expect(res.json).toHaveBeenCalledWith(expected)
//   })

//   it('should send 400 if email is already taken', async () => {
//     const {req, res} = mockExpress()

//     firebase.createUserWithEmailAndPassword.mockRejectedValue({
//       code: 'auth/email-already-in-use',
//     })

//     await createUser(req, res)

//     expect(res.status).toHaveBeenCalledWith(400)
//     expect(res.json).toHaveBeenCalledWith({message: 'Email is already used'})
//   })
// })

// describe('login', () => {
//   it('should return a 200 when successful', async () => {
//     const user = Models.createLandlord({email: 'test@gmail.com'})

//     await Db.insertUsers([user])
//     const {req, res} = mockExpress({body: {email: 'test@gmail.com'}})

//     firebase.signInWithEmailAndPassword.mockResolvedValue()
//     await login(req, res)

//     expect(res.status).toHaveBeenCalledWith(200)
//     expect(res.json).toHaveBeenCalledWith({
//       token: expect.any(String),
//       user: {
//         email: user.email,
//         type: user.type,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//     })
//   })

//   it('should return a 401 when bad credentials are given', async () => {
//     const {req, res} = mockExpress()

//     firebase.signInWithEmailAndPassword.mockRejectedValue()
//     await login(req, res)

//     expect(res.status).toHaveBeenCalledWith(401)
//     expect(res.json).toHaveBeenCalledWith({error: 'Invalid credentials'})
//   })
// })
