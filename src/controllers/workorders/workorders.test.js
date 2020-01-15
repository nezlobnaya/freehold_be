// Workorder Controllers Test
const WOController = require('./workorders')
const {Db, Models, Express} = require('../../test-utils')

beforeAll(async () => {
  await Db.reset()
  await Db.seedTables()
})

afterAll(async () => {
  await Db.destroyConn()
})

describe('Workorder Controllers', () => {
  describe('readAllByUser', () => {
    it('readAllByUser should return status 200', async () => {

      const req = Express.mockRequest({
        user: {
          id: 2,
        },
      })

      const res = Express.mockResponse()

      await WOController.readAllByUser(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.anything())
    })
  })

  describe('create', () => {
    it('create should send a status of 201 when successfully creating a workorder', async () => {

      const input = Models.createWorkorder()
      const req = Express.mockRequest({
        body: input,
        user: {
          id: 1,
        },
        property: {
          id: 2,
        },
      })
      const res = Express.mockResponse()

      await WOController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(expect.anything())
    })
  })

  describe('update', () => {
    it('update should send a status of 200 when successfully updating a workorder', async () => {

      const input = Models.createWorkorder()
      const req = Express.mockRequest({
        body: input,
        params: {
          id: 1
        }
      })
      const res = Express.mockResponse()

      await WOController.updateById(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.anything())
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({...input, "id": 1}))
    })
  })

})
