const request = require('supertest');
const db = require('../../../database/db-config.js');
const Reset = require('../dbReset.js');
const Properties = require('./property-model.js');

// functions for tests
function getPropsAll() { return db('properties') }

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

    it('Should return result of an object', async () => {
      
      // call function
      try {
        const results = await Properties.addProperty(newProperty);

        // expected results
        expect(typeof results).toBe('object');

      } catch(err) {
        console.log(err)
      }
    })

    it('Should return result that matches expected object', async () => {
      
      // call function
      try {
        const results = await Properties.addProperty(newProperty);

        // expected results
        expect(results).toMatchObject({
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
        });

      } catch(err) {
        console.log(err)
      }
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

      try {
        // call function
        const results = await Properties.getProperty(id);
        // expected results
        expect(results["propertyName"]).toBe("Sample");
      } catch(err) { console.log(err) }
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

  //#region - UPDATE
  
  describe('function updateProperty', () => {
    // updateProperty(changes, id) - updates input to properties and return results for a property by id

    it('Should update propertyName to: Sample Property Updated', async () => {
      try {
        // call function
        const results = await Properties.updateProperty({ "propertyName": "Sample Property Updated" }, 2);
        // expected results
        expect(results.propertyName).toBe('Sample Property Updated');
      } catch(err) {
        console.log(err)
      }
    })

    it('Should return result that matches expected object', async () => {
      try {
        // call function
        const results = await Properties.updateProperty({ 
          "propertyName": "Property Updated",
          "propertyStatus": "open" 
        }, 1);

        // expected results
        expect(results).toMatchObject({
          "propertiesId": 1,
          "propertyName": "Property Updated",
          "propertyAddress": {
            "street": "1 First St",
            "street2": "Suite 2",
            "city": "Salt Lake City",
            "state": "Utah",
            "zip": "84101",
            "country": "USA"
          },
          "propertyImage": "property.jpg",
          "propertyStatus": "open",
          "name": {
            "title": "Title",
            "firstname": "Firstname",
            "middlename": "Middlename",
            "lastname": "Lastname",
            "suffix": "Suffix",
            "preferredname": "Preferred"
          },
          "email": "landlord@email.com"
        });

      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion

  //#region - DELETE
  
  describe('function deleteProperty', () => {
    // deleteProperty(id) - deletes property based on the property's id

    it('Should return count 1 for number of deleted properties', async () => {
      try {
        // call function
        const results = await Properties.deleteProperty(2);
        // expected results
        expect(results).toBe(1);
      } catch(err) {
        console.log(err)
      }
    })

    it('Property by id Should return undefined after delete', async () => {
      const id = 2
      try {
        // call function
        await Properties.deleteProperty(id);
        // check database for the property by id
        const results = await Properties.getProperty(id);
        // expected results
        expect(results).not.toBeDefined();
      } catch(err) {
        console.log(err)
      }
    })

    it('Count of all Properties Should decrease by 1', async () => {
      try {
        // count properties before delete
        const dbBefore = await getPropsAll();
        const dbBeforeCount = dbBefore.length;

        // call function
        await Properties.deleteProperty(2);

        // count properties after delete
        const dbAfter = await getPropsAll();
        const dbAfterCount = dbAfter.length;

        // expected results -> Count before delete minus count after delete should equal 1
        expect(dbBeforeCount - dbAfterCount).toEqual(1);

      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion
})