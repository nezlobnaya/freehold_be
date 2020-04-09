const fireAdmin = require('firebase-admin')

function getEnv(key, fallback) {
  if (fallback) {
    return process.env[key] || fallback
  }

  return process.env[key]
}

const serviceAcc = {
  type: getEnv('FIREBASE_TYPE'),
  project_id: getEnv('FIREBASE_PROJECT_ID'),
  private_key_id: getEnv('FIREBASE_PRIVATE_KEY_ID'),
  private_key: getEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  client_email: getEnv('FIREBASE_CLIENT_EMAIL'),
  client_id: getEnv('FIREBASE_CLIENT_ID'),
  auth_uri: getEnv('FIREBASE_AUTH_URI'),
  token_uri: getEnv('FIREBASE_TOKEN_URI'),
  auth_provider_x509_cert_url: getEnv('FIREBASE_AUTH_CERT_URL'),
  client_x509_cert_url: getEnv('FIREBASE_CLIENT_CERT_URL'),
}

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

module.exports = fireAdmin
