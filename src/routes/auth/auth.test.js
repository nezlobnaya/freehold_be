// const supertest = require('supertest')
// const jwt = require('jsonwebtoken')
// const app = require('../../server')
// const firebase = require('../../lib/firebase')
// const {Db, Models} = require('../../test-utils')

// const request = supertest(app)

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// const mockUserResponse = () => ({
//   user: {
//     getIdToken: jest.fn(
//       () =>
//         new Promise(resolve => {
//           process.nextTick(() => resolve())
//         }),
//     ),
//   },
// })

// const createLogin = input => ({
//   email: 'test@gmail.com',
//   password: 'fakepassword',
//   type: 'landlord',
//   ...input,
// })

// describe('POST /api/auth/register', () => {
//   const endpoint = '/api/auth/register'

//   describe('Succsefully creating an account', () => {
//     it.skip('should return a 201 upon successfully creating a landlord', async () => {
//       const input = createLogin()
//       const mocked = mockUserResponse()
//       firebase.createUserWithEmailAndPassword.mockResolvedValue(mocked)

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(201)
//     })

//     it.skip('should return a 201 upon successfully creating a tenant', async () => {
//       const tenant = Models.createTenant()
//       await Db.insertUsers([Models.createLandlord(), tenant])
//       const input = createLogin({email: tenant.email, type: 'tenant'})
//       const mocked = mockUserResponse()

//       firebase.createUserWithEmailAndPassword.mockResolvedValue(mocked)

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(201)
//     })

//     it.skip('should return a token when succesfully created', async () => {
//       const input = createLogin()

//       const mocked = mockUserResponse()

//       firebase.createUserWithEmailAndPassword.mockResolvedValue(mocked)
//       const response = await request.post(endpoint).send(input)
//       expect(response.body.token).not.toBeUndefined()
//     })
//   })

//   describe('should return 400 when invalid input is given', () => {
//     it.skip('email must be present', async () => {
//       const input = createLogin({email: null})

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(400)
//       expect(response.body).toEqual({
//         errors: {email: 'Email is required'},
//       })
//     })

//     it.skip('password must be present', async () => {
//       const input = createLogin({password: null})

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(400)
//       expect(response.body).toEqual({
//         errors: {password: 'Password is required'},
//       })
//     })

//     it.skip('not a valid email format', async () => {
//       const input = createLogin({email: 'greg'})

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(400)
//       expect(response.body).toEqual({
//         errors: {email: 'The email supplied is not valid'},
//       })
//     })

//     it.skip('password must be at least 8 characters long', async () => {
//       const input = createLogin({password: '1234'})

//       const response = await request.post(endpoint).send(input)

//       expect(response.status).toBe(400)
//       expect(response.body).toEqual({
//         errors: {password: 'The password must be 8 characters long'},
//       })
//     })
//   })

//   it.skip('should return 401 when tenant is not invited', async () => {
//     const input = createLogin({type: 'tenant'})
//     const mocked = mockUserResponse()
//     firebase.createUserWithEmailAndPassword.mockResolvedValue(mocked)

//     const response = await request.post(endpoint).send(input)

//     expect(response.status).toBe(401)
//   })
// })

// describe('POST /api/auth/login', () => {
//   const endpoint = '/api/auth/login'

//   it.skip('should return a 200 upon succesfully logging in', async () => {
//     const user = Models.createUser()
//     const login = createLogin({email: user.email})
//     await Db.insertUsers([user])
//     firebase.signInWithEmailAndPassword.mockResolvedValue()

//     const response = await request.post(endpoint).send(login)

//     expect(response.status).toBe(200)
//   })
//   it.skip('should return a token when succesfully logging in', async () => {
//     const user = Models.createUser()
//     const login = createLogin({email: user.email})
//     await Db.insertUsers([user])
//     firebase.signInWithEmailAndPassword.mockResolvedValue()

//     const response = await request.post(endpoint).send(login)

//     const {token} = response.body
//     const decoded = jwt.decode(token)

//     expect(decoded.sub).toEqual(user.email)
//   })
//   it.skip('should return a 400 when invalid input is given', () => {})
//   it.skip('should return a 401 when incorrect email / password combination given', () => {})
// })
