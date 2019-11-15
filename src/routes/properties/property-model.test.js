const request = require('supertest');
const db = require('../../../database/db-config.js');
const Reset = require('../dbReset.js');
const Properties = require('./property-model.js');

describe('Property Model', () => {

  beforeEach(async () => {
    await Reset.dbReset();
  })

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
  // #endregion

})