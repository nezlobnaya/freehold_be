describe('work order controller test', () => {
  it('should work', () => {
    expect('test').toBe('test')
  })
})
// const User = require('./user')
// const {Db, Models} = require('../../test-utils')

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// const defaultLandlord = Models.createUser({
//   type: 'landlord',
//   email: 'landlord@gmail.com',
// })
// const defaultTenant = Models.createUser({
//   type: 'tenant',
//   email: 'tenant@gmail.com',
// })

// describe('User.create', () => {
//   it('should create a user', async () => {
//     await User.create(defaultLandlord)
//     const users = await Db.getAllUsers()

//     expect(users.length).toBe(1)
//     expect(users[0].firstName).toBe(defaultLandlord.firstName)
//   })

//   it('should create a tenant', async () => {
//     const user = await User.create(defaultTenant)
//     const users = await Db.getAllUsers()

//     expect(users.length).toBe(1)
//     expect(users[0].firstName).toBe(defaultTenant.firstName)
//     expect(user.firstName).toBe(defaultTenant.firstName)
//   })

//   it('should create a landlord', async () => {
//     const user = await User.create(defaultLandlord)
//     const users = await Db.getAllUsers()

//     expect(users.length).toBe(1)
//     expect(users[0].firstName).toBe(defaultLandlord.firstName)
//     expect(user.firstName).toBe(defaultLandlord.firstName)
//   })
// })

// describe('User.findByEmail', () => {
//   it('should return a user when the email matches any user', async () => {
//     await Db.insertUsers(defaultLandlord)

//     const user = await User.findByEmail(defaultLandlord.email)

//     expect(user.firstName).toBe(defaultLandlord.firstName)
//   })

//   it('should return null when the email does not match any user', async () => {
//     await Db.insertUsers(defaultLandlord)

//     const user = await User.findByEmail('george@gmail.com')

//     expect(user).toBe(null)
//   })
// })

// describe('User.updateByEmail', () => {
//   it('should return { updated: true, user } if the user exists', async () => {
//     await Db.insertUsers(defaultLandlord)

//     const update = {
//       firstName: 'George',
//     }

//     const result = await User.updateByEmail(defaultLandlord.email, update)

//     expect(result.updated).toBe(true)
//     expect(result.user.firstName).toBe(update.firstName)
//     expect(result.user.lastName).toBe(defaultLandlord.lastName)
//   })
//   it('should return { updated: false } if the user does not exist', async () => {
//     await Db.insertUsers(defaultLandlord)

//     const update = {
//       firstName: 'George',
//     }

//     const result = await User.updateByEmail('fake@gmail.com', update)

//     expect(result.updated).toBe(false)
//   })
// })
