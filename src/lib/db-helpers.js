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
const fakeMessages = []
const fakeWorkOrders = []
const fakeMedia = []
const fakePayments = []
const fakeUserUnits = []
const fakeUserMessages = []

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

const createFakeMessages = () => ({
  conversation_id: createRandomNum(5),
  message: faker.company.catchPhrase(),
})

const createFakeWorkOrder = () => ({
  name: faker.company.bsNoun(),
  description: faker.company.catchPhrase(),
  type: faker.company.bsBuzz(),
  status: faker.random.word(),
  comment: faker.random.words(),
  start_date: faker.date.recent(),
  update_date: faker.date.recent(),
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(14)]['id'],
  in_house: true,
})

const createFakeMedia = () => ({
  link: faker.internet.url(),
  title: faker.company.bsNoun(),
  work_order_id: createRandomNum(10),
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(14)]['id'],
})

const createFakePayments = () => ({
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(14)]['id'],
  type: faker.random.word(),
  amount: createRandomNum(2000),
  payment_date: faker.date.recent(),
  late: false,
  due_date: createRandomNum(30),
})

const createFakeUserUnits = () => ({
  unit_id: createRandomNum(10),
  user_id: fakeUsers[createRandomNum(14)]['id'],
  lease_start: faker.date.recent(),
  lease_end: faker.date.recent(),
})

const createFakeUserMessages = () => ({
  user_id: fakeUsers[createRandomNum(14)]['id'],
  message_id: createRandomNum(20),
})

createFakes(fakeUnits, createFakeUnit, 10)
createFakes(fakeMessages, createFakeMessages, 20)
createFakes(fakeWorkOrders, createFakeWorkOrder, 10)
createFakes(fakeMedia, createFakeMedia, 12)
createFakes(fakePayments, createFakePayments, 20)
createFakes(fakeUserUnits, createFakeUserUnits, 15)
createFakes(fakeUserMessages, createFakeUserMessages, 20)

module.exports = {
  fakeUsers,
  fakeUnits,
  fakeMessages,
  fakeWorkOrders,
  fakeMedia,
  fakePayments,
  fakeUserUnits,
  fakeUserMessages,
}
