const firebase = require('firebase')

function getEnv(key, fallback) {
  if (fallback) {
    return process.env[key] || fallback
  }

  return process.env[key]
}

firebase.initializeApp({
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseUrl: getEnv('FIREBASE_DATABASE_URL'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
})

module.exports = firebase
