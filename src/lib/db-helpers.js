const faker = require("faker");

const creatUser = type => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  // street: faker.address.streetAddress(),
  // city: faker.address.city(),
  // state: faker.address.state(),
  // zip: faker.address.zipCode(),
  phone: faker.phone.phoneNumber(),
  type
});

const createSeedResources = (creationFn, num = 20) => {
  let resources = [];

  if (num > 0) {
    for (let i = 0; i < num; i++) {
      resources.push(creationFn());
    }
  }

  return resources;
};

const createLandlord = () => creatUser("landlord");
const createTenant = () => creatUser("tenant");

const landlords = createSeedResources(createLandlord);
const tenants = createSeedResources(createTenant);

const seedUsers = [...landlords, ...tenants];

const getRandomLandlordId = () => {
  return landlords[Math.floor(Math.random() * landlords.length) - 1];
};

const createProperty = (landlordId = getRandomLandlordId()) => ({
  name: faker.company.companyName(),
  street: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  status: Math.round(Math.random()) === 0 ? "vacant" : "occupied",
  landlordId
});

const seedProperties = createSeedResources(createProperty, 100);

module.exports = {
  seedUsers,
  seedProperties
};
