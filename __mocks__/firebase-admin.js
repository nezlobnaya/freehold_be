const admin = {}

admin.initializeApp = jest.fn(() => admin)

admin.auth = jest.fn(() => admin)

admin.verifyIdToken = jest.fn(
  id =>
    new Promise((resolve, reject) => {
      process.nextTick(() => (id ? resolve(id) : reject()))
    }),
)

module.exports = admin
