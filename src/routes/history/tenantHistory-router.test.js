const app = require('../../server.js'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

// Reset Database
const Reset = require('../dbReset.js');

// paths
const path = '/api/history/';

// #region - Content used for tests
  const createInput = {
    'tenantId': 3,
    'propertyId': 5,
    'historyStartdate': "01-01-2001",
    'historyEnddate': "12-31-2006"
  }
  const createInput2 = {
    'tenantId': 5,
    'propertyId': 1,
    'historyStartdate': "12-31-2018"
  }
  const updateInput = {
    'historyStartdate': "01-01-2001",
    'historyEnddate': "12-31-2010"
  }
// #endregion

describe('Tenant History Routes', () => {

  beforeAll(async () => await Reset.dbReset());
  afterAll(() => Reset.close());
  afterEach(async done => done());

  //#region - CREATE
  
  // POST: '/api/history/' - add a new entry for tenant history, returns entry added
  describe ('POST: \'' + path + '\' endpoint', () => {

    // expected input
    // expects object - createInput or createInput2

    it('should return 201 status', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.post(path).send(createInput);
        // expected results
        expect(results.status).toBe(201);
        // catch error
      } catch(err) { console.log(err) }
    })

    it('should return a matching object', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.post(path).send(createInput2);
        const response = await results.body;
        // expected results
        expect(typeof response).toBe('object');
        // expect(response).toMatchObject(createInput2);
        expect(response.tenantId).toBe(5);
        expect(response.propertyId).toBe(1);
        expect(response.historyStartdate).toContain("2018-12-31");
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test 
    it('should fail if input is empty', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.post(path).send({});
        // expected results
        expect(results.status).toBe(500);
      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion - CREATE 

  //#region - READ

  // GET: '/api/history/:id' - Get by id
  describe('GET: \'' + path + ':id\' endpoint', () => {

    // expected input
    const id = 1

    it('should return 200 status', async () => {
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.get(path + id);  
        // expected results
        expect(results.status).toBe(200);
        // catch error
      } catch(err) { console.log(err) }
    })

    it('should return an object', async () => { 
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.get(path + id);
        const response = results.body;   
        // expected results 
        expect(typeof response).toBe('object');
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      try {
        // call function
        const results = await request.delete(path + '999');
        // expected results
        expect(results.status).toBe(404);
      } catch(err) {
        console.log(err)
      }
    })
  })

  // GET: '/api/history/property/:id' - Get all tenant history results for property, by property id.
  describe('GET: \'' + path + 'property/:id\' endpoint', () => {

    // expected input
    const id = 1 // property id

    it('should return 200 status', async done => {
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.get(path + 'property/' + id);  
        // expected results
        expect(results.status).toBe(200);
        done();
        // catch error
      } catch(err) { console.log(err) }
    })

    it('should return array', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.get(path + 'property/' + id);
        // expected results 
        expect(Array.isArray(results.body)).toBe(true);
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      try {
        // call function
        const results = await request.delete(path + '999');
        // expected results
        expect(results.status).toBe(404);
      } catch(err) {
        console.log(err)
      }
    })

  })

  // GET: '/api/history/tenant/:id' - Get all tenant history results by tenant id.
  describe('GET: \'' + path + 'tenant/:id\' endpoint', () => {

    // expected input
    const id = 3 // tenant id

    it('should return 200 status', async () => {   
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.get(path + 'tenant/' + id);  
        // expected results
        expect(results.status).toBe(200);
        // catch error
      } catch(err) { console.log(err) }
    })

    it('should return array', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.get(path + 'tenant/' + id);
        const response = results.body;   
        // expected results 
        expect(Array.isArray(response)).toBe(true);
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      try {
        // call function
        const results = await request.delete(path + '999');
        // expected results
        expect(results.status).toBe(404);
      } catch(err) {
        console.log(err)
      }
    })
  })

  // #endregion

  //#region - UPDATE
  describe ('PUT: \'' + path + '/:id\' endpoint', () => {

    // expected input
    const id = 1 // expects id from url
    // expects object to be sent - updateInput

    it('should return 200 status', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.put(path + id).send(updateInput);
        // expected results
        expect(results.status).toBe(200);
      } catch(err) {
        console.log(err)
      }
    })

    it('should return an object', async () => { 
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.put(path + id).send(updateInput);
        const response = await results.body;   
        // expected results 
        expect(typeof response).toBe('object');
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test 
    it('should fail if id is not valid', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.put(path + '999').send(updateInput);
        const response = JSON.parse(results.text);
        // expected results
        expect(results.status).toBe(404);
        expect(response).toHaveProperty('message');
        expect(response).toEqual({"message": "Could not find entry with given id."});
      } catch(err) {
        console.log(err)
      }
    })

    it('should fail if update is empty', async () => {
      expect.hasAssertions();
      try {
        // call function
        const results = await request.put(path + id).send({});
        // expected results
        expect(results.status).toBe(500);
      } catch(err) {
        console.log(err)
      }
    })
    
  })

  //#endregion - UPDATE 

  //#region - DELETE
  describe ('delete: \'' + path + '/:id\' endpoint', () => {

    // expected input
    const id = 2 // expects id from url

    it('should return 200 status', async () => {
      try {
        // call function
        const results = await request.delete(path + id); 
        // expected results
        expect(results.status).toBe(200);
      } catch(err) {
        console.log(err)
      }
    })

    it('should return an object', async () => { 
      expect.hasAssertions();
      try {   
        // call function
        const results = await request.delete(path + "3");
        const response = await results.body;  
        // expected results 
        expect(typeof response).toBe('object');
        // catch error
      } catch(err) { console.log(err) }
    })

    // Failed Test
    it('should fail if id is not valid with status 404', async () => {
      try {
        // call function
        const results = await request.delete(path + '999');
        // expected results
        expect(results.status).toBe(404);
      } catch(err) {
        console.log(err)
      }
    })

    it('should fail if id is not valid with message', async () => {
      try {
        // call function
        const results = await request.delete(path + '999');
        const response = JSON.parse(results.text);
        // expected results
        expect(response).toHaveProperty('message');
        expect(response).toEqual({"message": "Could not find entry with given id."});
      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion - DELETE 
})