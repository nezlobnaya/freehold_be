const {Db, Models} = require('../../test-utils')
const Workorders = require('./workorders.js')

beforeEach(async () => {
  await Db.reset()
})

afterAll(async () => {
  await Db.destroyConn()
})

//const defaultWorkorder = Models.createWorkorder()

describe('Workorder Model', () => {

  describe('function get', () => {
    it('Should return 2 results', async () => {
      // call function
      await Db.seedTables()

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

})
