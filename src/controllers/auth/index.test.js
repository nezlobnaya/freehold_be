const {createUser, login} = require('./')
const {Express, Db, Models} = require('../../test-utils')
const firebase = require('../../lib/firebase')

const mockRequest = input =>
  Express.mockRequest({
    body: {
      email: 'test@gmail.com',
      password: '123',
    },
    ...input,
  })

const mockExpress = (req, res) => ({
  req: mockRequest(req),
  res: Express.mockResponse(res),
})

beforeEach(async () => {
  await Db.reset()
})

afterAll(async () => {
  await Db.destroyConn()
})

describe.skip('createUser', () => {
  it('should return a 201 on success', async () => {
    const user = Models.createLandlord()
    await Db.insertUsers([user])

    const {req, res} = mockExpress({body: {email: user.email}, user: user})

    firebase.createUserWithEmailAndPassword.mockResolvedValue({
      user: firebase.user,
    })

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
  })

  it('should send a token on success', async () => {
    const {req, res} = mockExpress({user: {}})
    const expected = {
      token: expect.any(String),
      user: {
        email: req.body.email,
      },
    }

    firebase.createUserWithEmailAndPassword.mockResolvedValue({
      user: firebase.user,
    })

    await createUser(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('should send 400 if email is already taken', async () => {
    const {req, res} = mockExpress()

    firebase.createUserWithEmailAndPassword.mockRejectedValue({
      code: 'auth/email-already-in-use',
    })

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({message: 'Email is already used'})
  })
})

describe('login', () => {
  it('should return a 200 when successful', async () => {
    const user = Models.createLandlord({email: 'test@gmail.com'})

    await Db.insertUsers([user])
    const {req, res} = mockExpress({body: {email: 'test@gmail.com'}})

    firebase.signInWithEmailAndPassword.mockResolvedValue()
    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: {
        email: user.email,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  })

  it('should return a 401 when bad credentials are given', async () => {
    const {req, res} = mockExpress()

    firebase.signInWithEmailAndPassword.mockRejectedValue()
    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({error: 'Invalid credentials'})
  })
})
