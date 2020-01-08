const app = require('../../server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const {Db, Models} = require('../../test-utils')
const usersFixture = () =>
  Db.insertUsers([
    Models.createLandlord(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createTenant(),
  ])

const propertiesFixutre = () => Db.insertProperties([Models.createProperty()])

const testFixture = async () => {
  let users = await usersFixture()
  let properties = await propertiesFixutre()

  return [users, properties]
}

beforeEach(async () => {
  await Db.reset()
})

afterAll(async () => {
  await Db.destroyConn()
})

// paths
const path = '/api/history/'

// #region - Content used for tests
const updateInput = {
  startDate: '01/01/2001',
  endDate: '12/31/2010',
}
// #endregion

describe('Tenant History Routes', () => {
  //#region - CREATE

  // POST: '/api/history/' - add a new entry for tenant history, returns entry added
  describe("POST: '" + path + "' endpoint", () => {
    // expected input
    // expects object - createInput or createInput2

    it('should return 201 status', async () => {
      const input = Models.createTenantHistory({tenantId: 2})

      await testFixture()

      // call function
      const results = await request.post(path).send(input)
      // expected results
      expect(results.status).toBe(201)
      // catch error
    })

    it('should return a matching object', async () => {
      // call function
      const input = Models.createTenantHistory({
        tenantId: 5,
        propertyId: 1,
        startDate: new Date(),
      })

      await testFixture()

      const results = await request.post(path).send(input)

      const response = await results.body
      // expected results
      expect(response).toEqual({...input, id: 1})
      // catch error
    })

    // Failed Test
    it('should return 400 when input is invalid', async () => {
      // call function
      const results = await request.post(path).send({})
      // expected results
      expect(results.status).toBe(400)
    })
  })

  //#endregion - CREATE

  //#region - READ

  // GET: '/api/history/:id' - Get by id
  describe("GET: '" + path + ":id' endpoint", () => {
    // expected input
    const id = 1

    it('should return 200 status', async () => {
      await testFixture()
      await Db.insertTenantHistories(Models.createTenantHistory())
      // call function
      const results = await request.get(path + id)
      // expected results
      expect(results.status).toBe(200)
      // catch error
    })

    it('should return an object', async () => {
      // call function
      await testFixture()

      const input = Models.createTenantHistory()

      await Db.insertTenantHistories(input)

      const results = await request.get(path + id)
      const response = results.body
      // expected results
      expect(response).toEqual({...input, id})
      // catch error
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      // call function
      const results = await request.get(path + '999')
      // expected results
      expect(results.status).toBe(404)
    })
  })

  // GET: '/api/history/property/:id' - Get all tenant history results for property, by property id.
  describe("GET: '" + path + "property/:id' endpoint", () => {
    // expected input
    const id = 1 // property id

    it('should return 200 status', async () => {
      // call function
      await testFixture()
      const input = Models.createTenantHistory()
      await Db.insertTenantHistories(input)

      const results = await request.get(path + 'property/' + id)
      // expected results
      expect(results.status).toBe(200)
    })

    it('should return array', async () => {
      // call function
      await testFixture()
      const input = Models.createTenantHistory()
      await Db.insertTenantHistories(input)

      const results = await request.get(path + 'property/' + id)
      // expected results
      expect(Array.isArray(results.body)).toBe(true)
      // catch error
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      // call function
      const results = await request.get(path + 'property/999')
      // expected results
      expect(results.status).toBe(404)
    })
  })

  // GET: '/api/history/tenant/:id' - Get all tenant history results by tenant id.
  describe("GET: '" + path + "tenant/:id' endpoint", () => {
    // expected input
    const id = 3 // tenant id

    it('should return 200 status', async () => {
      // call function
      await testFixture()

      const results = await request.get(path + 'tenant/' + id)
      // expected results
      expect(results.status).toBe(200)
      // catch error
    })

    it('should return array', async () => {
      await testFixture()
      // call function
      const results = await request.get(path + 'tenant/' + id)
      const response = results.body
      // expected results
      expect(Array.isArray(response)).toBe(true)
      // catch error
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      // call function
      const results = await request.get(path + 'tenant/999')
      // expected results
      expect(results.status).toBe(404)
      expect(results.body).toEqual({message: 'No tenant found with that id'})
    })
  })

  // #endregion

  //#region - UPDATE
  describe("PUT: '" + path + ":id' endpoint", () => {
    // expected input
    const id = 1 // expects id from url
    // expects object to be sent - updateInput

    it('should return 200 status', async () => {
      await testFixture()
      // call function
      await Db.insertTenantHistories(Models.createTenantHistory())
      const results = await request.put(path + id).send(updateInput)
      // expected results
      expect(results.status).toBe(200)
    })

    it('should return an object', async () => {
      // call function
      await testFixture()

      const tenantHistory = Models.createTenantHistory()
      await Db.insertTenantHistories(tenantHistory)

      const results = await request.put(path + id).send(updateInput)
      const response = await results.body
      // expected results
      expect(response).toEqual({...tenantHistory, ...updateInput, id: 1})
      // catch error
    })

    // Failed Test
    it('should fail if id is not valid', async () => {
      // call function
      await testFixture()

      const results = await request.put(path + '999').send(updateInput)

      // expected results
      expect(results.status).toBe(404)
      expect(results.body).toEqual({
        message: 'Could not find entry with given id.',
      })
    })

    it('should fail if update is empty', async () => {
      // call function
      await testFixture()
      const th = Models.createTenantHistory()
      await Db.insertTenantHistories(th)

      const results = await request.put(path + id).send({})
      // expected results
      expect(results.status).toBe(400)
      expect(results.body).toEqual({
        message: 'Request body must not be empty',
      })
    })
  })

  //#endregion - UPDATE

  //#region - DELETE
  describe("delete: '" + path + "/:id' endpoint", () => {
    // expected input
    const id = 2 // expects id from url

    it('should return 200 status', async () => {
      await testFixture()
      await Db.insertTenantHistories([
        Models.createTenantHistory(),
        Models.createTenantHistory(),
      ])
      // call function
      const results = await request.delete(path + id)
      // expected results
      expect(results.status).toBe(200)
    })

    it('should return an object', async () => {
      const id = 3

      await testFixture()

      const expected = Models.createTenantHistory()

      await Db.insertTenantHistories([
        Models.createTenantHistory(),
        Models.createTenantHistory(),
        expected,
      ])

      // call function
      const results = await request.delete(`${path}3`)
      // expected results
      expect(results.body).toEqual({...expected, id})
      // catch error
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      await testFixture()
      // call function
      const results = await request.delete(path + '999')
      // expected results
      expect(results.status).toBe(404)
      expect(results.body).toEqual({
        message: 'Could not find entry with given id.',
      })
    })
  })

  //#endregion - DELETE
})
