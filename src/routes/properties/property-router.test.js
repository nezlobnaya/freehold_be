const app = require('../../server.js'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const Reset = require('../dbReset.js');
// const db = require('../../../database/db-config.js');
// const Properties = require('./property-model.js');

// content used for tests
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
  const newProperty = {
    "propertyName": "New Property Added",
    "propertyAddress": {},
    "propertyImage": "newProperty.jpg",
    "propertyStatus": "occupied",
    "propertyStartdate": "2019-01-01",
    "landlordId": 1
  };
  const landlordEmail = "landlord@email.com";

describe('Properties Routes', () => {

  beforeEach(async () => {
    await Reset.dbReset();
  })

  //#region - CREATE
  describe ('post: \'/api/properties/\' endpoint', () => {

    it('should return 201 status', async done => {
      try {
        // call function
        const results = await request.post('/api/properties/').send(newProperty);
        // expected results
        expect(results.status).toBe(201);
        done();
      } catch(err) {
        console.log(err)
      }
    })

    it('should return an object', async done => {
      
      const results = await request.post('/api/properties/').send(newProperty);
      const response = await results.body;
    
      expect(typeof response).toBe('object');
      done();
    })

  })

  //#endregion - CREATE 

  //#region - READ
  describe('get: \'/api/properties/\' endpoint', () => {

    it('should return 200 status', async done => {
      
      const results = await request.get('/api/properties/');    
      expect(results.status).toBe(200);
      done();
    })

    it('should return array', async done => {
      
      const results = await request.get('/api/properties/');
      const response = await results.body;
    
      expect(Array.isArray(response)).toBe(true);
      done();
    })

    it('should return a length of 2', async done => {
      
      const results = await request.get('/api/properties/');
      const response = await results.body;
    
      expect(response).toHaveLength(2);
      done();
    })
  })

  describe ('get: \'/api/properties/:id\' endpoint', () => {

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

  describe ('get: \'/api/properties/user/:email\' endpoint', () => {

    it('should return 200 status', async done => {
      
      const results = await request.get('/api/properties/user/"landlord@email.com"');
      expect(results.status).toBe(200);
      done();
    })

    it('should return array', async done => {
      
      const results = await request.get('/api/properties/user/' + landlordEmail );
      const response = await results.body;
    
      expect(Array.isArray(response)).toBe(true);
      done();
    })

    it('should return a length of 2', async done => {
      
      const results = await request.get('/api/properties/user/' + landlordEmail );
      const response = await results.body;
    
      expect(response).toHaveLength(2);
      done();
    })

    it('should return objects with the users email landlord@email.com', async done => {
      
      const results = await request.get('/api/properties/user/' + landlordEmail );
      const response = await results.body;
    
      expect(response[0].email).toBe("landlord@email.com");
      expect(response[1].email).toBe("landlord@email.com");
      done();
    })

    it('if user does not exist should return empty array', async done => {
      
      const results = await request.get('/api/properties/user/test' );
      const response = await results.body;
    
      expect(response).toEqual([]);
      done();
    })
  })
  // #endregion

})