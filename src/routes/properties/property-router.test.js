const app = require('../../server.js'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const Reset = require('../dbReset.js');
// const db = require('../../../database/db-config.js');
// const Properties = require('./property-model.js');

const exampleProperty = {
  "propertiesId": 1,
  "propertyName": "Name for the Property",
  "propertyAddress": {
    "street": "1 First St",
    "street2": "Suite 2",
    "city": "Salt Lake City",
    "state": "Utah",
    "zip": "84101",
    "country": "USA"
  },
  "propertyImage": "property.jpg",
  "propertyStatus": "occupied",
  "propertyStartdate": "2001-01-01T05:00:00.000Z",
  "propertyEnddate": null,
  "name": {
    "title": "Title",
    "firstname": "Firstname",
    "middlename": "Middlename",
    "lastname": "Lastname",
    "suffix": "Suffix",
    "preferredname": "Preferred"
  },
  "email": "landlord@email.com"
};

describe('Properties Routes', () => {

  beforeEach(async () => {
    await Reset.dbReset();
  })

  //#region - READ
  describe('get: \'/api/properties/\' endpoint', () => {

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

    it('should return array with length of 2', async done => {
      
      const results = await request.get('/api/properties/');
      const response = await results.body;
    
      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(2);
      done();
    })
  })

  describe('get: \'/api/properties/:id\' endpoint', () => {

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

    it('should return an object that matches example', async done => {
      
      const results = await request.get('/api/properties/1');
      const response = await results.body;
    
      expect(response).toMatchObject(exampleProperty);
      done();
    })
  })
  // #endregion

})