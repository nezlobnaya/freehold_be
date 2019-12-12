const db = require('../../../database/db-config.js');
const TenantHistory = require('./tenantHistory-model');
const parseDate = require('../../lib/parseDate.js');

// Reset Database
const Reset = require('../dbReset.js');

// functions for tests
function getAll() { return db('tenanthistory') }

describe('Tenant History Model', () => {

  beforeEach(async () => {
    await Reset.dbReset();
  })

  afterEach( async done => {
    done();
  })
  
  afterAll(() => Reset.close());

  //#region - CREATE
  
  describe('function addTenantHistory', () => {
    
    it('inserts input to tenant history table and return results by id', async () => {
      
      // call function
      try {
        const results = await TenantHistory.addTenantHistory(
          { // id: 8
            'tenantId': 5,
            'propertyId': 1,
            'historyStartdate': null,
            'historyEnddate': null
          });
        
        // parse date
        results.historyStartdate = parseDate.simple(results.historyStartdate);
        results.historyEnddate = parseDate.simple(results.historyEnddate);

        // expected results
        expect(results.id).toBe(8);
        expect(results.propertyId).toBe(1);
        expect(results.propertyName).toBe('Name for the Property');
        expect(results.tenantId).toBe(5);
        expect(results.historyStartdate).toBeNull();
        expect(results.historyEnddate).toBeNull();

      } catch(err) {
        console.log(err)
      }
    })

    it('Count of all entries should increase by 1', async () => {
      try {
        // count entries before insert
        const dbBefore = await getAll();
        const dbBeforeCount = dbBefore.length;

        // call function        
        await TenantHistory.addTenantHistory(
          { // id: 8
            'tenantId': 5,
            'propertyId': 1,
            'historyStartdate': null,
            'historyEnddate': null
          });

        // count entries after insert
        const dbAfter = await getAll();
        const dbAfterCount = dbAfter.length;

        // expected results -> Check Difference
        expect(dbAfterCount - dbBeforeCount).toEqual(1);

      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion

  //#region - READ 
  
  describe('function getHistoryById', () => {

    it('Should return an object', async () => {

      // Expected Input
      const id = 1;
      
      // call function
      try {
        const results = await TenantHistory.getHistoryById(id);

        // expected results
        expect(typeof results).toBe('object');

      } catch(err) {
        console.log(err)
      }
    })
    
    it('id 1 should return specific values', async () => {

      // Expected Input
      const id = 1;
      
      // call function
      try {
        const results = await TenantHistory.getHistoryById(id);
        
        // parse date
        results.historyStartdate = parseDate.simple(results.historyStartdate);
        results.historyEnddate = parseDate.simple(results.historyEnddate);

        // expected results
        expect(results.propertyId).toBe(2);
        expect(results.propertyName).toBe('Sample');
        expect(results.tenantId).toBe(3);
        expect(results.name).toMatchObject({ firstname: 'Tenant' });
        expect(results.email).toBe('tenant@email.com');
        expect(results.phone).toBeNull();
        expect(results.historyStartdate).toBe('01/01/2001');
        expect(results.historyEnddate).toBe('12/31/2009');

      } catch(err) {
        console.log(err)
      }
    })

  })
  
  describe('function getHistoryByProperty', () => {
    
    it('Property with id 1 should have length of 1', async () => {
      
      // call function
      try {
        const results = await TenantHistory.getHistoryByProperty(1);

        // expected results
        expect(results).toHaveLength(1);

      } catch(err) {
        console.log(err)
      }
    })
    
    it('Property with id 1 should return array with specific values', async () => {
      
      // call function
      try {
        const results = await TenantHistory.getHistoryByProperty(1);
        
        // parse date
        results[0].historyStartdate = parseDate.simple(results[0].historyStartdate);

        // expected results
        expect(results[0].id).toBe(2);
        expect(results[0].tenantId).toBe(3);
        expect(results[0].name).toMatchObject({ firstname: 'Tenant' });
        expect(results[0].email).toBe('tenant@email.com');
        expect(results[0].phone).toBeNull();
        expect(results[0].historyStartdate).toBe('01/01/2010');
        expect(results[0].historyEnddate).toBeNull();

      } catch(err) {
        console.log(err)
      }
    })

  })
  
  describe('function getHistoryByTenant', () => {
    
    it('Tenant with userId 3 should have length of 2', async () => {
      
      // call function
      try {
        const results = await TenantHistory.getHistoryByTenant(3);

        // expected results
        expect(results).toHaveLength(2);

      } catch(err) {
        console.log(err)
      }
    })
    
    it('Tenant with userId 3 should return array with specific values', async () => {
      
      // call function
      try {
        const results = await TenantHistory.getHistoryByTenant(3);

        // parse date
        results[0].historyStartdate = parseDate.simple(results[0].historyStartdate);
        results[0].historyEnddate = parseDate.simple(results[0].historyEnddate);
        results[1].historyStartdate = parseDate.simple(results[1].historyStartdate);

        // expected results
        expect(results[0].id).toBe(1);
        expect(results[0].propertyId).toBe(2);
        expect(results[0].propertyName).toBe('Sample');
        expect(results[0].historyStartdate).toBe('01/01/2001');
        expect(results[0].historyEnddate).toBe('12/31/2009');
        
        expect(results[1].id).toBe(2);
        expect(results[1].propertyId).toBe(1);
        expect(results[1].propertyName).toBe('Name for the Property');
        expect(results[1].historyStartdate).toBe('01/01/2010');
        expect(results[1].historyEnddate).toBeNull();

      } catch(err) {
        console.log(err)
      }
    })

  })

  //#endregion

  //#region - Update
  
  describe('function updateHistory', () => {

    it('Update Should return an object', async () => {

      // Expected Input
      const id = 1;
      const updatedEntry = { tenantId: 5 }
      
      // call function
      try {
        const results = await TenantHistory.updateHistory(updatedEntry, id);

        // expected results
        expect(typeof results).toBe('object');

      } catch(err) {
        console.log(err)
      }
    })
    
    it('Update Should return specific values', async () => {

      // Expected Input
      const id = 1;
      const updatedEntry = { tenantId: 5 }
      
      // call function
      try {
        const results = await TenantHistory.updateHistory(updatedEntry, id);
        
        // parse date
        results.historyStartdate = parseDate.simple(results.historyStartdate);
        results.historyEnddate = parseDate.simple(results.historyEnddate);

        // expected results
        expect(results.propertyId).toBe(2);
        expect(results.propertyName).toBe('Sample');
        expect(results.tenantId).toBe(5);
        expect(results.name).toMatchObject({ firstname: 'Second', lastname: 'Tenant' });
        expect(results.email).toBe('tenant2@email.com');
        expect(results.phone).toBeNull();
        expect(results.historyStartdate).toBe('01/01/2001');
        expect(results.historyEnddate).toBe('12/31/2009');

      } catch(err) {
        console.log(err)
      }
    })
    
    it('Update dates should return specific dates', async () => {

      // Expected Input
      const id = 2;
      const updatedEntry = { historyEnddate: '11/30/2019' }
      
      // call function
      try {
        const results = await TenantHistory.updateHistory(updatedEntry, id);
        
        // parse date
        results.historyStartdate = parseDate.simple(results.historyStartdate);
        results.historyEnddate = parseDate.simple(results.historyEnddate);

        // expected results
        expect(results.propertyId).toBe(1);
        expect(results.historyEnddate).toBe('11/30/2019');

      } catch(err) {
        console.log(err)
      }
    })

  })
  
  //#endregion

  //#region - Delete
  
  describe('function deleteHistory', () => {
    // expected input
    const id = 2

    it('Should return count 1 for number of deleted entries', async () => {

      try {
        // call function
        const results = await TenantHistory.deleteHistory(id);
        // expected results
        expect(results).toBe(1);
      } catch(err) {
        console.log(err)
      }
    })

    it('Entry by id should return undefined after delete', async () => {

      try {
        // call function
        await TenantHistory.deleteHistory(id);
        // check database for the entry by id
        const results = await TenantHistory.getHistoryById(id);
        // expected results
        expect(results).not.toBeDefined();
      } catch(err) {
        console.log(err)
      }
    })

    it('Count of all entries should decrease by 1', async () => {

      try {
        // count properties before delete
        const dbBefore = await getAll();
        const dbBeforeCount = dbBefore.length;

        // call function
        await TenantHistory.deleteHistory(id);

        // count properties after delete
        const dbAfter = await getAll();
        const dbAfterCount = dbAfter.length;

        // expected results -> Count before delete minus count after delete should equal 1
        expect(dbBeforeCount - dbAfterCount).toEqual(1);

      } catch(err) {
        console.log(err)
      }
    })

  // })

  })
  //#endregion

})