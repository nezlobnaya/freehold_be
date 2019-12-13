const TenantHistory = require("./tenantHistory-model");
const moment = require("moment");

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
    const [users, properties] = await setupFixtures();

    const dateInput = moment.utc();

    const input = {
      tenantId: 5,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    const expected = {
      id: 1,
      firstName: users[4].firstName,
      lastName: users[4].lastName,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      email: users[4].email,
      name: properties[0].name
    };

    const results = await TenantHistory.addTenantHistory(input);

    // expected results
    expect(results).toEqual(expect.objectContaining(expected));
  });

  it("Count of all entries should increase by 1", async () => {
    // count entries before insert
    await setupFixtures();

    const dateInput = moment.utc();

    const input = {
      tenantId: 5,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    const before = await Db.getAllTenantHistory();
    await TenantHistory.addTenantHistory(input);
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

    const dateInput = moment.utc();

    const input = {
      tenantId: 5,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    await TenantHistory.addTenantHistory(input);

    // call function
    try {
      const results = await TenantHistory.getHistoryById(id);

      // expected results
      expect(typeof results).toBe("object");
    } catch (err) {
      console.log(err);
    }
  });

  it("id 1 should return specific values", async () => {
    // Expected Input
    const id = 1;
    const [users, properties] = await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 1,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    await TenantHistory.addTenantHistory(input);

    // call function
    const results = await TenantHistory.getHistoryById(id);

    // parse date

    // expected results
    expect(results.name).toBe(properties[0].name);
    expect(results.firstName).toEqual(users[0].firstName);
    expect(results.lastName).toEqual(users[0].lastName);
    expect(results.email).toBe(users[0].email);
    expect(results.phone).toBe(users[0].phone);
    expect(results.startDate).toEqual(expect.any(Date));
    expect(results.endDate).toEqual(expect.any(Date));
  });
});

describe("function getHistoryByProperty", () => {
  it("Property with id 1 should have length of 1", async () => {
    // call function
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 1,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    await TenantHistory.addTenantHistory(input);
    const results = await TenantHistory.getHistoryByProperty(1);

    // expected results
    expect(results).toHaveLength(1);
  });

  it("Property with id 1 should return array with specific values", async () => {
    // call function
    const [users] = await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 1,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };

    await TenantHistory.addTenantHistory(input);
    const results = await TenantHistory.getHistoryByProperty(1);

    // expected results
    expect(results[0].id).toBe(1);
    expect(results[0].email).toBe(users[0].email);
    expect(results[0].phone).toEqual(users[0].phone);
    expect(results[0].startDate).toEqual(expect.any(Date));
    expect(results[0].endDate).toEqual(expect.any(Date));
  });
});

describe("function getHistoryByTenant", () => {
  it("Tenant with userId 3 should have length of 2", async () => {
    // call function
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };
    const input2 = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);
    await TenantHistory.addTenantHistory(input2);
    const results = await TenantHistory.getHistoryByTenant(3);

    // expected results
    expect(results).toHaveLength(2);
  });

  it("Tenant with userId 3 should return array with specific values", async () => {
    // call function
    const [, properties] = await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };
    const input2 = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: null
    };
    await TenantHistory.addTenantHistory(input);
    await TenantHistory.addTenantHistory(input2);
    const results = await TenantHistory.getHistoryByTenant(3);

    // parse date

    // expected results
    expect(results[0].id).toBe(1);
    expect(results[0].propertyId).toBe(1);
    expect(results[0].name).toBe(properties[0].name);
    expect(results[0].startDate).toEqual(expect.any(Date));
    expect(results[0].endDate).toEqual(expect.any(Date));

    expect(results[1].id).toBe(2);
    expect(results[1].propertyId).toBe(2);
    expect(results[1].name).toBe(properties[1].name);
    expect(results[1].startDate).toEqual(expect.any(Date));
    expect(results[1].endDate).toBeNull();
  });
});

//#endregion

//#region - Update

describe("function updateHistory", () => {
  it("Update Should return an object", async () => {
    // Expected Input
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 1,
      startDate: dateInput,
      endDate: dateInput
    };
    const id = 1;
    const updatedEntry = { tenantId: 5 };

    await TenantHistory.addTenantHistory(input);
    // call function
    const results = await TenantHistory.updateHistory(updatedEntry, id);

    // expected results
    expect(typeof results).toBe("object");
  });

  it("Update Should return specific values", async () => {
    // Expected Input
    const [users, props] = await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);

    const id = 1;
    const updatedEntry = { tenantId: 5 };

    // call function
    const results = await TenantHistory.updateHistory(updatedEntry, id);

    // expected results
    // expect(results.propertyId).toBe(input.propertyId);
    expect(results.name).toBe(props[1].name);
    // expect(results.tenantId).toBe(input.tenantId);
    expect(results.firstName).toEqual(users[2].firstName);
    expect(results.lastName).toEqual(users[2].lastName);
    expect(results.email).toBe(users[2].email);
    expect(results.phone).toEqual(users[2].phone);
    expect(results.startDate).toEqual(expect.any(Date));
    expect(results.endDate).toEqual(expect.any(Date));
  });

  it("Update dates should return specific dates", async () => {
    // Expected Input
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);
    const id = 1;
    const updatedEntry = { endDate: "11/30/2019" };

    // call function
    const results = await TenantHistory.updateHistory(updatedEntry, id);

    // expected results
    expect(
      results.endDate.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      })
    ).toContain("11/30/2019");
  });
});

//#endregion

//#region - Delete

describe("function deleteHistory", () => {
  // expected input
  const id = 2;

  it("Should return count 1 for number of deleted entries", async () => {
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);
    await TenantHistory.addTenantHistory(input);
    // call function
    const results = await TenantHistory.deleteHistory(id);
    // expected results
    expect(results).toBe(1);
  });

  it("Entry by id should return undefined after delete", async () => {
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);
    await TenantHistory.addTenantHistory(input);
    // call function
    await TenantHistory.deleteHistory(id);
    // check database for the entry by id
    const results = await TenantHistory.getHistoryById(id);
    // expected results
    expect(results).not.toBeDefined();
  });

  it("Count of all entries should decrease by 1", async () => {
    await setupFixtures();

    const dateInput = moment.utc();
    const input = {
      tenantId: 3,
      propertyId: 2,
      startDate: dateInput,
      endDate: dateInput
    };
    await TenantHistory.addTenantHistory(input);
    await TenantHistory.addTenantHistory(input);
    // count properties before delete
    const dbBefore = await Db.getAllTenantHistory();
    const dbBeforeCount = dbBefore.length;

    // call function
    await TenantHistory.deleteHistory(id);

    // count properties after delete
    const dbAfter = await Db.getAllTenantHistory();
    const dbAfterCount = dbAfter.length;

    // expected results -> Count before delete minus count after delete should equal 1
    expect(dbBeforeCount - dbAfterCount).toEqual(1);
  });

  // })
});
//#endregion
// });
