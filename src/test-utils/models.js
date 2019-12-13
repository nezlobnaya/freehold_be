const createUser = input => {
  return {
    firstName: "Matt",
    lastName: "Hagner",
    street: "123 Test Ln",
    city: "Test City",
    state: "MN",
    zip: "55555",
    email: "test@gmail.com",
    type: "landlord",
    phone: "1238675309",
    ...input
  };
};

const createLandlord = input => createUser({ type: "landlord", ...input });
const createTenant = input =>
  createUser({ type: "tenant", ...input });

const createProperty = input => {
  return {
    name: "First Property",
    street: "123 Easy Street",
    city: "Minneapolis",
    state: "MN",
    zip: "55330",
    image: "newProperty.jpg",
    status: "occupied",
    landlordId: 1,
    ...input
  };
};

const createTenantHistory = input => {
  return {
    tenantId: 1,
    propertyId: 1,
    historyStartdate: new Date(),
    historyEnddate: new Date(),
    ...input
  };
};

module.exports = {
  createLandlord,
  createUser,
  createProperty,
  createTenant,
  createTenantHistory
};
