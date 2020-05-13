const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

// const docs = require('./docs/index.js')

// Require Routers
const authRouter = require('./routes/auth/')
const usersRouter = require('./routes/users')
const unitRouter = require('./routes/unit/unit-router')
const workorderRouter = require('./routes/workorders/wo-router.js')
const mediaRouter = require('./routes/media/media-router')
const paymentsRouter = require('./routes/payments/payments-router')
const messageRouter = require('./routes/message/message-router')
const tenantRouter = require('./routes/tenant/tenant-router')

// Auth Middleware

const restricted = require('./middleware/restricted')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

app.get('/protected', restricted, (req, res) => {
  res.send(`Yay! your email is ${req.user}`)
})

// Routes
//TODO
//Not clean, im sorry
app.use('/api/auth', restricted, authRouter)
app.use('/api/users', restricted, usersRouter)
app.use('/api/properties', restricted, unitRouter)
app.use('/api/workorders', restricted, workorderRouter)
app.use('/api/media', restricted, mediaRouter)
app.use('/api/payments', restricted, paymentsRouter)
app.use('/api/message', restricted, messageRouter)
app.use('/api/tenant', restricted, tenantRouter)
// Base Route
app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send('<h1>FreeHold Backend</h1>')
})

// Redirect any other route
app.get('/*', function (_req, res) {
  res.redirect('/')
})

module.exports = app
