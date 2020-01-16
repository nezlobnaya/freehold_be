const supertest = require('supertest')
const admin = require('../../lib/admin')
const app = require('../../server.js') // Link to your server file
const {Db, Models} = require('../../test-utils')

const request = supertest(app)

//#region setup variables

const routeAPI = '/api/workorders'

const defaultLandlord = Models.createUser()

const mockVerifyId = (email = defaultLandlord.email) =>
  admin.verifyIdToken.mockResolvedValue({email})

//#endregion

beforeAll(async () => {
  await Db.reset()
  await Db.seedTables()
  await Db.insertUsers(defaultLandlord)
})

afterAll(async () => {
  await Db.destroyConn()
})

describe('Workorder Routes', () => {

  describe("get: '" + routeAPI + "' endpoint", () => {
    it('should return a 401 when the user is not authorized', async () => {
      const {error} = await request.get(routeAPI)

      expect(error.status).toBe(401)
    })

    it('should return 200 status', async () => { 
      admin.verifyIdToken.mockResolvedValue({email: defaultLandlord.email})

      const results = await request
        .get(routeAPI)
        .set('Authorization', 'Bearer 1234')

      expect(results.status).toBe(200)
      expect(results.body.length).toBe(0)
    })
  })

})