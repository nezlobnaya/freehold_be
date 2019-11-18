const request = require('supertest');
const db = require('../../../database/db-config.js');
const Reset = require('../dbReset.js');
const Properties = require('./property-model.js');

describe('Property Model', () => {

  const newProperty = {
    "propertyName": "New Property Added",
    "propertyAddress": {
      "street": "1 First St",
      "street2": "Suite 2",
      "city": "Salt Lake City",
      "state": "Utah",
      "zip": "84101",
      "country": "USA"
    },
    "propertyImage": "newProperty.jpg",
    "propertyStatus": "occupied",
    "propertyStartdate": "2019-01-01",
    "landlordId": 1
  };

  beforeEach(async () => {
    await Reset.dbReset();
  })

  afterEach( async done => {
    done();
  })

  //#region - CREATE 
  
  describe('function addProperty', () => {
    // addProperty(input) - inserts input to properties and return results for a property by id inserted

    it('Should return 1 result', async () => {      
      // call function
      const results = await Properties.addProperty(newProperty);
      // expected results
      expect(results).toHaveLength(1);
    })

    it('Should return result of an object', async () => {
      
      // call function
      const results = await Properties.addProperty(newProperty);
      // expected results
      expect(typeof results).toBe('object');
    })

    it('Should return result that matches expected object', async () => {
      // call function
      const results = await Properties.addProperty(newProperty);
      // expected results
      expect(results).toMatchObject(newProperty);
    })

  })

  //#endregion - CREATE

  //#region - READ
  describe('function getAllProperties', () => {

    it('Should return 2 results', async () => {
      
      // call function
      try {
        const results = await Properties.getAllProperties();

        // expected results
        expect(results.length).toEqual(2);

      } catch(err) {
        console.log(err)
      }
    })

    it('Should return an array', async () => {
      
      // call function
      try {
        const results = await Properties.getAllProperties();

        // expected results
        expect(Array.isArray(results)).toBe(true);

      } catch(err) {
        console.log(err)
      }
    })

  })

  describe('function getProperty(id)', () => {

    it('Should return an object', async () => {

      // Expected Input
      const id = 1;
      
      // call function
      try {
        const results = await Properties.getProperty(id);

        // expected results
        expect(typeof results).toBe('object');

      } catch(err) {
        console.log(err)
      }
    })

    it('Should return "Sample" for the property with id=2', async () => {

      // Expected Input
      const id = 2;
      
      // call function
      try {
        const results = await Properties.getProperty(id);

        // expected results
        expect(results["propertyName"]).toBe("Sample");

      } catch(err) {
        console.log(err)
      }
    })
  })

  describe('function getPropertiesByUser(email)', () => {

    it('Should return 2 results for email: landlord@email.com', async () => {
      
      // call function
      const results = await Properties.getPropertiesByUser("landlord@email.com");

      // expected results
      expect(results.length).toEqual(2);
    })

    it('Should return an array', async () => {
      
      // call function
      const results = await Properties.getPropertiesByUser("landlord@email.com");

      // expected results
      expect(Array.isArray(results)).toBe(true);
    })

    it('Should return object 1 with the user\'s email: \'landlord@email.com\'', async () => {
      
      // call function
      const results = await Properties.getPropertiesByUser("landlord@email.com");

      // expected results
      expect(results[0].email).toBe("landlord@email.com");
    })

    it('Should return object 2 with the user\'s email: \'landlord@email.com\'', async () => {
      
      // call function
      const results = await Properties.getPropertiesByUser("landlord@email.com");

      // expected results
      expect(results[1].email).toBe("landlord@email.com");
    })

  })
  // #endregion

})