const TenantHistory = require("./tenantHistory-model");
const addDays = require("date-fns/addDays");
const parse = require("date-fns/parse");
const format = require("date-fns/format");

const MDY = "MM/dd/yyyy";

const formatStandard = date => (date ? format(date, MDY) : null);
const parseStandard = date => parse(date, MDY, new Date());
const addFormattedDate = (date, days = 14) =>
  formatStandard(addDays(parseStandard(date), days));

// Reset Database
const { Db, Models } = require("../../test-utils");

const userFixture = () =>
  Db.insertUsers([
    Models.createLandlord(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createTenant(),
    Models.createLandlord()
  ]);

const propertyFixture = () =>
  Db.insertProperties([Models.createProperty(), Models.createProperty()]);

const setupFixtures = async () => {
  const users = await userFixture();
  const properties = await propertyFixture();

  return [users, properties];
};

beforeEach(async () => {
  await Db.reset();
});

afterAll(async () => {
  await Db.destroyConn();
});

//describe("Tenant History Model", () => {
//  //#region - CREATE

describe("function addTenantHistory", () => {
  it("inserts input to tenant history table and return results by id", async () => {
    // call function
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 5 });

    const results = await TenantHistory.create(input);

    // expected results
    expect(results).toEqual({ ...input, id: 1 });
  });

  it("Count of all entries should increase by 1", async () => {
    // count entries before insert
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 5 });

    const before = await Db.getAllTenantHistory();
    await TenantHistory.create(input);
    const after = await Db.getAllTenantHistory();

    // expected results
    expect(after.length - before.length).toEqual(1);
  });
});

//#endregion

//#region - READ

describe("function getHistoryById", () => {
  it("Should return an object", async () => {
    // Expected Input
    const id = 1;
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 5 });

    await Db.insertTenantHistories(input);

    const tenantHistory = await TenantHistory.getById(id);

    // call function
    expect(typeof tenantHistory).toBe("object");
  });

  it("id 1 should return specific values", async () => {
    // Expected Input
    const id = 1;
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 1, propertyId: 1 });

    await Db.insertTenantHistories(input);

    // call function
    const results = await TenantHistory.getById(id);

    // parse date

    // expected results
    expect(results).toEqual({ ...input, id: 1 });
  });
});

describe("function getByPropertyId", () => {
  it("Property with id 1 should have length of 1", async () => {
    // call function
    await setupFixtures();

    const input = Models.createTenantHistory();

    await Db.insertTenantHistories(input);

    const results = await TenantHistory.getByPropertyId(1);

    // expected results
    expect(results).toHaveLength(1);
  });

  it("Property with id 1 should return array with specific values", async () => {
    // call function
    await setupFixtures();

    const input = Models.createTenantHistory();

    await Db.insertTenantHistories(input);
    const results = await TenantHistory.getByPropertyId(1);

    // expected results
    expect(results).toEqual([{ ...input, id: 1 }]);
  });
});

describe("function getByTenantId", () => {
  it("Tenant with userId 3 should have length of 2", async () => {
    // call function
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3 });
    const input2 = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });

    await Db.insertTenantHistories([input, input2]);

    const results = await TenantHistory.getByTenantId(3);

    // expected results
    expect(results).toHaveLength(2);
  });

  it("Tenant with userId 3 should return array with specific values", async () => {
    // call function
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3 });
    const input2 = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });

    await Db.insertTenantHistories([input, input2]);
    const [first, second] = await TenantHistory.getByTenantId(3);

    // parse date

    // expected results
    expect(first).toEqual({ ...input, id: 1 });

    expect(second).toEqual({ ...input2, id: 2 });
  });
});

//#endregion

//#region - Update

describe("function updateHistory", () => {
  it("Update Should return an object", async () => {
    // Expected Input
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3 });

    const id = 1;
    const updatedEntry = {
      startDate: addFormattedDate(input.startDate, 14)
    };

    await Db.insertTenantHistories(input);
    // call function
    const results = await TenantHistory.updateById(updatedEntry, id);

    // expected results
    expect(typeof results).toBe("object");
  });

  it("Update Should return specific values", async () => {
    // Expected Input
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });

    await Db.insertTenantHistories(input);

    const id = 1;
    const updatedEntry = {
      startDate: addFormattedDate(input.startDate, 14)
    };

    // call function
    const results = await TenantHistory.updateById(updatedEntry, id);

    // expected results
    expect(results).toEqual({ ...input, id: 1, ...updatedEntry });
  });

  it("Update dates should return specific dates", async () => {
    // Expected Input
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });

    await Db.insertTenantHistories(input);

    const id = 1;
    const updatedEntry = {
      endDate: formatStandard(parseStandard("12/30/2019"))
    };

    // call function
    const results = await TenantHistory.updateById(updatedEntry, id);

    // expected results
    expect(results.endDate).toEqual(updatedEntry.endDate);
  });
});

//#endregion

//#region - Delete

describe("function deleteHistory", () => {
  // expected input
  const id = 2;

  it("Should return { deleted: true, tenantHistory } for the deleted entries", async () => {
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });

    const input2 = Models.createTenantHistory({ tenantId: 2, propertyId: 1 });

    await Db.insertTenantHistories([input, input2]);

    // call function
    const { deleted, tenantHistory } = await TenantHistory.deleteById(id);

    // expected results
    expect(deleted).toBe(true);
    expect(tenantHistory).toEqual({ ...input2, id: 2 });
  });

  it("Entry by id should return undefined after delete", async () => {
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });
    const input2 = Models.createTenantHistory({ tenantId: 2, propertyId: 1 });

    await Db.insertTenantHistories([input, input2]);

    // call function
    await TenantHistory.deleteById(id);
    // check database for the entry by id
    const results = await Db.getAllTenantHistory();
    const element = results.find(el => el.id === id);
    // expected results
    expect(element).not.toBeDefined();
  });

  it("Count of all entries should decrease by 1", async () => {
    await setupFixtures();

    const input = Models.createTenantHistory({ tenantId: 3, propertyId: 2 });
    const input2 = Models.createTenantHistory({ tenantId: 2, propertyId: 1 });

    await Db.insertTenantHistories([input, input2]);
    // count properties before delete
    const dbBefore = await Db.getAllTenantHistory();
    const dbBeforeCount = dbBefore.length;

    // call function
    await TenantHistory.deleteById(id);

    // count properties after delete
    const dbAfter = await Db.getAllTenantHistory();
    const dbAfterCount = dbAfter.length;

    // expected results -> Count before delete minus count after delete should equal 1
    expect(dbBeforeCount - dbAfterCount).toEqual(1);
  });
});
//#endregion
