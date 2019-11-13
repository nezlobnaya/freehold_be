const app = require('../../server.js'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const Reset = require('../dbReset.js');
// const db = require('../../../database/db-config.js');
// const Properties = require('./property-model.js');

describe('Properties Route', () => {

  beforeEach(async () => {
    await Reset.dbReset();
  })

  //#region - READ
  describe('gets the \'/api/properties/\' endpoint', () => {

    it('should return 200 status', async done => {
      
      const results = await request.get('/api/properties/');    
      expect(results.status).toBe(200);
      done();
    })

    it('should return array with length of 2', async done => {
      
      const results = await request.get('/api/properties/');
      const response = await results.body;
    
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toEqual(2);
      done();
    })
  })

  describe('gets the \'/api/properties/:id\' endpoint', () => {

    it('should return 200 status', async done => {
      
      const results = await request.get('/api/properties/1');
      expect(results.status).toBe(200);
      done();
    })

    it('should return an object', async done => {
      
      const results = await request.get('/api/properties/1');
      const response = await results.body;
    
      expect(typeof response).toBe('object');
      done();
    })
  })
  // #endregion

})