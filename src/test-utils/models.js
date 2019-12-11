const createUser = input => {
  const obj = {
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

  return obj;
};

const createProperty = input => {
  const obj = {
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

  return obj;
};

module.exports = {
  createUser,
  createProperty
};
