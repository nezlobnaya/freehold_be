const faker = require('faker')

// mock media data
const mockMedia = {
  type: 'picture',
  link: faker.internet.url(),
  format: 'jpeg',
  title: 'stain 2',
  timestamp: '1944-03-08 21:00:00-04',
  work_order_id: 1,
  unit_id: 1,
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyd3',
}
const mockMediaId = 1

//mock message data
const mockMessage = {
  conversation_id: 1,
  message: 'first message',
}
const mockConversation = [
  {
    conversation_id: 1,
    message: 'first message',
  },
  {
    conversation_id: 1,
    message: 'second message',
  },
]
const mockMessageId = 1
const mockConversationId = 1

// mock payment data
const mockPayment = {
  unit_id: 1,
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyD3',
  type: 1,
  amount: 1000,
  payment_date: '2020-4-18',
  late: false,
  due_date: 15,
}
const mockPaymentId = 1

// mock unit data
const mockUnit = {
  name: 'unit',
  street_address: '951 St',
  city: 'virtual',
  state: 'space',
  zip: '12345',
  occupied: 1,
  rent: 1000,
}
const unitId = 1

// mock user data
const mockUser = {
  landlord: true,
  email: 'email@email.com',
}
const decodedToken = {
  user_id: 'j1k23lia9',
}

// mock work order data
const mockWorkOrder = {
  name: 'first work order',
  description: 'doing stuff',
  type: 'plumbing',
  status: 'pending',
  comment: 'comment',
  start_date: '1943-03-09T01:00:00Z',
  end_date: '1943-03-09T01:00:00Z',
  unit_id: '1',
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyD3',
  in_house: true,
}
const mockWorkOrderId = 1

module.exports = {
  mockMedia,
  mockMediaId,
  mockMessage,
  mockConversation,
  mockConversationId,
  mockMessageId,
  mockPayment,
  mockPaymentId,
  mockUnit,
  unitId,
  mockUser,
  decodedToken,
  mockWorkOrder,
  mockWorkOrderId,
}
