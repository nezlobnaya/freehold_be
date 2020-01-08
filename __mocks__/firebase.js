let firebase = {}

firebase.initializeApp = jest.fn(() => firebase)

firebase.auth = jest.fn(() => firebase)

firebase.createUserWithEmailAndPassword = jest.fn(
  (email, password) =>
    new Promise((resolve, reject) =>
      process.nextTick(() => (email && password ? resolve() : reject())),
    ),
)

firebase.signInWithEmailAndPassword = jest.fn(
  (email, password) =>
    new Promise((resolve, reject) =>
      process.nextTick(() => (email && password ? resolve() : reject())),
    ),
)

let currentUser = {
  getIdToken: jest.fn(
    () => new Promise(resolve => process.nextTick(() => resolve('1234'))),
  ),
}

firebase.currentUser = currentUser

let user = {}

user.getIdToken = jest.fn(
  () => new Promise(resolve => process.nextTick(() => resolve('1234'))),
)

firebase.user = user

module.exports = firebase
