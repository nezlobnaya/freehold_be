const WorkOrderController = require('./workorders-controller')
const WorkOrderModel = require('../../models/workorders/workorders-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/workorders/workorders-model')

let req, res, next
const mockWorkOrder = {
  name: 'first work order',
  description: 'doing stuff',
  type: 'plumbing',
  status: 'pending',
  comment: 'comment',
  start_date: '1943-03-09T01:00:00Z',
  end_date: '1943-03-09T01:00:00Z',
  unit_id: '1',
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyD3',
  in_house: true,
}
const mockWorkOrderId = 1

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('WorkOrderController.create', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.create).toBe('function')
  })

  it('should call WorkOrderModel.add', async () => {
    await WorkOrderController.create(req, res, next)
    expect(WorkOrderModel.add).toHaveBeenCalledWith(req.body)
  })

  it('should return response 201 and json data', async () => {
    WorkOrderModel.add.mockReturnValue(mockWorkOrder)
    await WorkOrderController.create(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot create workorder'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.add.mockReturnValue(rejectedPromise)
    await WorkOrderController.create(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('WorkOrderController.readById', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.readById).toBe('function')
  })

  it('should call WorkOrderModel.getById', async () => {
    req.params.id = mockWorkOrderId
    await WorkOrderController.readById(req, res, next)
    expect(WorkOrderModel.getById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    WorkOrderModel.getById.mockReturnValue(mockWorkOrder)
    await WorkOrderController.readById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get work order'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.getById.mockReturnValue(rejectedPromise)
    await WorkOrderController.readById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    WorkOrderModel.getById.mockReturnValue(null)
    await WorkOrderController.readById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('WorkOrderController.updateById', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.updateById).toBe('function')
  })

  it('should call WorkOrderModel.update', async () => {
    req.params.id = mockWorkOrderId
    req.body = mockWorkOrder
    await WorkOrderController.updateById(req, res, next)
    expect(WorkOrderModel.update).toHaveBeenCalledWith(req.body, req.params.id)
  })

  it('should return status 200 and json data', async () => {
    WorkOrderModel.update.mockReturnValue(mockWorkOrder)
    await WorkOrderController.updateById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot update work order'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.update.mockReturnValue(rejectedPromise)
    await WorkOrderController.updateById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    WorkOrderModel.update.mockReturnValue(null)
    await WorkOrderController.updateById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

// const testFixture = async () => {
//   const [landlord] = await Db.insertUsers(Models.createLandlord())
//   const [property] = await Db.insertProperties(Models.createProperty())

//   const [tenant] = await Db.insertUsers(
//     Models.createTenant({residenceId: property.id, landlordId: landlord.id}),
//   )

//   return {landlord, property, tenant}
// }

// beforeEach(async () => {
//   await Db.reset()
// })

// afterAll(async () => {
//   await Db.destroyConn()
// })

// describe('Workorder Controllers', () => {
//   describe('readAllByUser', () => {
//     describe('[user.type="landlord"]', () => {
//       it('readAllByUser should return status 200', async () => {
//         const {tenant, landlord, property} = await testFixture()
//         const workOrders = await Db.insertWorkorders([
//           Models.createWorkorder({
//             createdBy: tenant.id,
//             propertyId: tenant.residenceId,
//           }),
//           Models.createWorkorder({
//             createdBy: landlord.id,
//             propertyId: property.id,
//           }),
//         ])

//         const req = Express.mockRequest({
//           user: landlord,
//         })

//         const res = Express.mockResponse()

//         await WOController.readAllByUser(req, res)

//         expect(res.status).toHaveBeenCalledWith(200)
//         expect(res.json).toHaveBeenCalledWith(workOrders)
//       })
//     })

//     describe('[user.type="tenant"]', () => {
//       it('readAllByUser should return status 200', async () => {
//         const {tenant, landlord, property} = await testFixture()

//         const workOrders = await Db.insertWorkorders([
//           Models.createWorkorder({
//             createdBy: tenant.id,
//             propertyId: tenant.residenceId,
//           }),
//           Models.createWorkorder({
//             createdBy: landlord.id,
//             propertyId: property.id,
//           }),
//         ])

//         const req = Express.mockRequest({
//           user: tenant,
//         })

//         const res = Express.mockResponse()

//         await WOController.readAllByUser(req, res)

//         expect(res.status).toHaveBeenCalledWith(200)
//         expect(res.json).toHaveBeenCalledWith(workOrders)
//       })
//     })
//   })

//   describe('create', () => {
//     describe('[user.type="landlord"]', () => {
//       it('create should send a status of 201 when successfully creating a workorder', async () => {
//         const {landlord, property} = await testFixture()

//         const input = Models.createWorkorder()

//         const req = Express.mockRequest({
//           body: input,
//           user: landlord,
//           property: {id: property.id},
//         })
//         const res = Express.mockResponse()

//         await WOController.create(req, res)

//         expect(res.status).toHaveBeenCalledWith(201)
//         expect(res.json).toHaveBeenCalledWith(expect.anything())
//       })
//     })

//     describe('[user.type="tenant"]', () => {
//       it('create should send a status of 201 when successfully creating a workorder', async () => {
//         const {tenant} = await testFixture()

//         const input = Models.createWorkorder({
//           createdBy: tenant.id,
//           propertyId: tenant.residenceId,
//         })

//         const req = Express.mockRequest({
//           body: input,
//           user: tenant,
//           property: {id: tenant.residenceId},
//         })
//         const res = Express.mockResponse()

//         await WOController.create(req, res)

//         expect(res.status).toHaveBeenCalledWith(201)
//         expect(res.json).toHaveBeenCalledWith(expect.anything())
//       })
//     })
//   })

//   xdescribe('update', () => {
//     it('update should send a status of 200 when successfully updating a workorder', async () => {
//       const input = Models.createWorkorder()
//       const req = Express.mockRequest({
//         body: input,
//         params: {
//           id: 1,
//         },
//       })
//       const res = Express.mockResponse()

//       await WOController.updateById(req, res)

//       expect(res.status).toHaveBeenCalledWith(200)
//       expect(res.json).toHaveBeenCalledWith(expect.anything())
//       // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({...input, "id": 1}))
//     })
//   })
// })
