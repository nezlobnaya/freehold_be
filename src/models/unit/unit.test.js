describe('work order controller test', () => {
  it('should work', () => {
    expect('test').toBe('test')
  })
})

// const {Db, Models} = require('../../test-utils')
// const Properties = require('./unit')

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// const landlord = Models.createUser({type: 'landlord'})
// const defaultProperty = Models.createProperty()

// describe('Property Model', () => {
//   //#region - CREATE

//   describe('function addProperty', () => {
//     // addProperty(input) - inserts input to properties and return results for a property by id inserted

//     it('Should return result of an object', async () => {
//       // call function
//       const [user] = await Db.insertUsers(landlord)
//       const results = await Properties.addProperty(defaultProperty, user.id)

//       // expected results
//       expect(typeof results).toBe('object')
//     })

//     it('Should return result that matches expected object', async () => {
//       // call function
//       const [user] = await Db.insertUsers(landlord)
//       const results = await Properties.addProperty(defaultProperty, user.id)

//       // expected results
//       expect(results).toEqual({...defaultProperty, id: 1})
//     })
//   })

//   //#endregion - CREATE

//   //#region - READ
//   describe('function getAllProperties', () => {
//     it('Should return 2 results', async () => {
//       // call function
//       await Db.insertUsers(landlord)
//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({
//           name: 'Second Prop',
//         }),
//       ])

//       const results = await Properties.getAllProperties()

//       // expected results
//       expect(results.length).toEqual(2)
//     })

//     it('Should return an array', async () => {
//       // call function
//       const results = await Properties.getAllProperties()

//       // expected results
//       expect(Array.isArray(results)).toBe(true)
//     })
//   })

//   describe('function getProperty(id)', () => {
//     it('Should return an object', async () => {
//       // Expected Input
//       const id = 1
//       await Db.insertUsers(landlord)
//       await Db.insertProperties(defaultProperty)

//       // call function
//       const results = await Properties.getProperty(id)

//       // expected results
//       expect(typeof results).toBe('object')
//     })

//     it('Should return "Sample" for the property with id=2', async () => {
//       // Expected Input
//       const id = 2
//       const input = {
//         name: 'Sample',
//       }
//       const property = Models.createProperty(input)

//       await Db.insertUsers(landlord)

//       await Db.insertProperties([defaultProperty, property])

//       // call function
//       const results = await Properties.getProperty(id)
//       // expected results
//       expect(results.name).toBe(input.name)
//     })
//   })

//   describe('function getPropertiesByUser(landlordId)', () => {
//     it('Should return 2 results for landlordId: 1', async () => {
//       const [user] = await Db.insertUsers(landlord)

//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({name: 'Test'}),
//       ])

//       // call function
//       const results = await Properties.getPropertiesByUser(user.id)

//       // expected results
//       expect(Array.isArray(results)).toBe(true)
//       expect(results.length).toEqual(2)
//     })
//   })
//   // #endregion

//   //#region - UPDATE

//   describe('function updateProperty', () => {
//     // updateProperty(changes, id) - updates input to properties and return results for a property by id

//     it('Should update name to: Sample Property Updated', async () => {
//       // call function

//       const id = 2
//       await Db.insertUsers(landlord)
//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({name: 'test'}),
//       ])

//       const update = {name: 'Sample Property Updated'}

//       const {updated, property} = await Properties.updateProperty(update, id)
//       // expected results
//       expect(updated).toBe(true)
//       expect(property).toEqual({...property, ...update, id})
//     })
//   })

//   //#endregion

//   //#region - DELETE

//   describe('function deleteProperty', () => {
//     // deleteProperty(id) - deletes property based on the property's id

//     it('Should return { deleted: true } when successfully deleted', async () => {
//       await Db.insertUsers(landlord)
//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({name: 'test'}),
//       ])
//       // call function
//       const {deleted} = await Properties.deleteProperty(2)
//       // expected results
//       expect(deleted).toBe(true)
//     })

//     it('Property by id Should return undefined after delete', async () => {
//       await Db.insertUsers(landlord)
//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({name: 'test'}),
//       ])

//       const id = 2
//       // call function
//       await Properties.deleteProperty(id)
//       // check database for the property by id
//       const results = await Properties.getProperty(id)
//       // expected results
//       expect(results).toBe(null)
//     })

//     it('Count of all Properties Should decrease by 1', async () => {
//       await Db.insertUsers(landlord)
//       await Db.insertProperties([
//         defaultProperty,
//         Models.createProperty({name: 'test'}),
//       ])
//       // count properties before delete
//       const dbBefore = await Db.getAllProperties()
//       const dbBeforeCount = dbBefore.length

//       // call function
//       await Properties.deleteProperty(2)

//       // count properties after delete
//       const dbAfter = await Db.getAllProperties()
//       const dbAfterCount = dbAfter.length

//       // expected results -> Count before delete minus count after delete should equal 1
//       expect(dbBeforeCount - dbAfterCount).toEqual(1)
//     })
//   })

//   //#endregion
// })
