const faker = require('faker')

// const createRandomNum = () => {
//   return Math.floor(Math.random() * 6) + 1
// }

const createFakeUnit = () => ({
  name: faker.company.companyName(),
  street_address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  occupied: faker.random.number(),
  rent: faker.random.number(),
})

const fakeUnits = []
const numberOfUnits = 10
for (let i = 0; i < numberOfUnits; i++) {
  fakeUnits.push(createFakeUnit())
}

const createFakeWorkOrder = () => ({
  name: faker.random.word(),
  description: faker.random.words(),
  type: faker.random.word(),
  status: faker.random.status(),
  comment: faker.random.words(),
  start_date: faker.date.recent(),
  end_date: faker.date.recent(),
})

const fakeUsers = [
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocya3',
    landlord: true,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyb3',
    landlord: true,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyc3',
    landlord: true,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyd3',
    landlord: true,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocye3',
    landlord: true,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyf3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyg3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyh3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyi3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyj3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyk3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyl3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocym3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyn3',
    landlord: false,
  },
  {
    id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyo3',
    landlord: false,
  },
]

module.exports = {
  fakeUsers,
  fakeUnits,
  createFakeWorkOrder,
}
