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

      // Expected Input
      
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

      // Expected Input
      
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

  // #endregion

})