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

  console.log(workorder)

})
