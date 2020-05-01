const faker = require('faker')

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
const fakeUnits = []
const fakeWorkOrders = []
const fakeMedia = []

const createRandomNum = max => {
  return Math.floor(Math.random() * max) + 1
}

const createFakes = (typeArray, typeFunction, numberOfFakes) => {
  for (let i = 0; i < numberOfFakes; i++) {
    typeArray.push(typeFunction())
  }
}

const createFakeUnit = () => ({
  name: faker.company.companyName(),
  street_address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  occupied: createRandomNum(4),
  rent: faker.random.number(2000),
})

const createFakeWorkOrder = () => ({
  name: faker.random.word(),
  description: faker.random.words(),
  type: faker.random.word(),
  status: faker.random.word(),
  comment: faker.random.words(),
  start_date: faker.date.recent(),
  end_date: faker.date.recent(),
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(15)]['id'],
  in_house: true,
})

const createFakeMedia = () => ({
  type: faker.random.word(),
  link: faker.internet.url(),
  format: faker.system.fileType(),
  title: faker.random.word(),
  work_order_id: createRandomNum(10),
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(15)]['id'],
})

createFakes(fakeUnits, createFakeUnit, 10)
createFakes(fakeWorkOrders, createFakeWorkOrder, 10)
createFakes(fakeMedia, createFakeMedia, 12)

module.exports = {
  fakeUsers,
  fakeUnits,
  fakeWorkOrders,
  fakeMedia,
}
