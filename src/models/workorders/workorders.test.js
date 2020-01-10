const {Db, Models} = require('../../test-utils')
const Workorders = require('./workorders.js')

beforeEach(async () => {
  await Db.reset()
  await Db.seedTables()
})

afterAll(async () => {
  await Db.destroyConn()
})

//const defaultWorkorder = Models.createWorkorder()

describe('Workorder Model', () => {

  describe('function get', () => {
    it('Should return 2 results', async () => {

      // call function
      const results = await Workorders.get()
      console.log(results)

      // expected results
      expect(results.length).toEqual(2)

    })

    it('Should return an array', async () => {

      // call function
      const results = await Workorders.get()

      // expected results
      expect(Array.isArray(results)).toBe(true)

    })
  })

  describe('function getById(id)', () => {
    it('Should return an object', async () => {
      
      // Expected Input
      const id = 1

      // call function
      const results = await Workorders.getById(id)
      console.log(results)

      // expected results
      expect(typeof results).toBe('object')

    })

    it('Should return title: "Short Description" for the property with id=2', async () => {

      // Expected Input
      const id = 2

      // call function
      const results = await Workorders.getById(id)
      console.log(results)
      
      // expected results
      expect(results.title).toBe('Short Description')
      
    })
  })

})
