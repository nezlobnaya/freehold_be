const {Db} = require('../../test-utils')
const Workorders = require('./workorders.js')

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

  describe('function getBy(query)', () => {

    it('Should return an Array', async () => {
      
      // Expected Input
      const query = { createdBy: 2 }

      // call function
      const results = await Workorders.getBy(query)

      // expected results
      expect(Array.isArray(results)).toBe(true)

    })

    it('Should return 2 workorders for property with id 1', async () => {
      
      // Expected Input
      const query = { propertyId: 1 }

      // call function
      const results = await Workorders.getBy(query)
      
      // expected results
      expect(results.length).toEqual(2)

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

  describe('function remove', () => {

    it('Should return { deleted: true } when successfully deleted', async () => {
      // call function
      const {deleted} = await Workorders.remove(2)
      // expected results
      expect(deleted).toBe(true)
    })

    it('Workorder by id Should return undefined after delete', async () => {
      const id = 2
      // call function
      await Workorders.remove(id)
      // check database for the property by id
      const results = await Workorders.getById(id)
      // expected results
      expect(results).toBe(null)
    })

    it('Count of all workorders Should decrease by 1', async () => {

      // count workorders before delete
      const dbBefore = await Workorders.get()
      const dbBeforeCount = dbBefore.length

      // call function
      await Workorders.remove(2)

      // count properties after delete
      const dbAfter = await Workorders.get()
      const dbAfterCount = dbAfter.length

      // expected results -> Count before delete minus count after delete should equal 1
      expect(dbBeforeCount - dbAfterCount).toEqual(1)
    })
  })

})
