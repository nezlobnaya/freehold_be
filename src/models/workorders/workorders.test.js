const {Db, Models} = require('../../test-utils')
const Workorders = require('./workorders.js')
const seedData = require('../../../database/seedData.js')

beforeEach(async () => {
  await Db.reset()
  await Db.seedTables()
})

afterAll(async () => {
  await Db.destroyConn()
})

const defaultWorkorder = {
    "title": "New Work order",
    "description": "Description of the issue.",
    "type": "electrical",
    "startDate": "11-03-2019",
    "endDate": null
  }

describe('Workorder Model', () => {

  describe('function add', () => {

    it('Should return result of an object', async () => {
      // call function
      const results = await Workorders.add(defaultWorkorder, 1, 2)

      // expected results
      expect(typeof results).toBe('object')
    })

    it('Should return result that matches expected object', async () => {
      // call function
      const results = await Workorders.add(defaultWorkorder, 1, 2)

      // expected results
      expect(results.id).toBe(3)
      expect(results.title).toBe("New Work order")
      expect(results.propertyId).toBe(1)
      expect(results.createdBy).toBe(2)
    })
  })

  describe('function get', () => {
    it('Should return 2 results', async () => {

      // call function
      const results = await Workorders.get()

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

      // expected results
      expect(typeof results).toBe('object')

    })

    it('Should return title: "Short Description" for the workorder with id=2', async () => {

      // Expected Input
      const id = 2

      // call function
      const results = await Workorders.getById(id)
      
      // expected results
      expect(results.title).toBe('Short Description')

    })
  })

  describe('function update', () => {

    it('Should update title to: Updated Workorder', async () => {
      // call function

      const id = 2
      const update = {title: 'Updated Workorder'}

      const {updated, results} = await Workorders.update(update, id)

      // expected results
      expect(updated).toBe(true)
      expect(results.title).toBe('Updated Workorder')
    })
  })

})
