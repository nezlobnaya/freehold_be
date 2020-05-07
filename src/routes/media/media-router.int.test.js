const req = require('supertest')
const app = require('../../server')
const {mockMedia} = require('../../test-utils/mock-data')
const endpointUrl = '/api/media/'

describe(endpointUrl, () => {
  it('POST ' + endpointUrl, async () => {
    const res = await req(app).post(endpointUrl).send(mockMedia)
    expect(res.statusCode).toBe(200)
    expect(res.body.link).toBe(mockMedia.link)
  })
})
