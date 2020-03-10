const firebase = require('firebase')
const fireAdmin = require('firebase-admin')
const serviceAcc = require('../../property-management-lambda-firebase-adminsdk-ilwrc-eec7b3f120.json')

function getEnv(key, fallback) {
  if (fallback) {
    return process.env[key] || fallback
  }

  return process.env[key]
}

firebase.initializeApp({
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseUrl: getEnv('FIREABASE_DATABASE_URL'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREABASE_MESSAGING_SENDER_ID'),
})

fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert(serviceAcc),
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseURL: getEnv('FIREABASE_DATABASE_URL'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID'),
})

module.exports = {firebase, fireAdmin}
