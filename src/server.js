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

// Auth Middleware

const restricted = require('./middleware/restricted')

const requireAuth = require('./lib/require-auth')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

app.get('/protected', restricted, requireAuth, (req, res) => {
  res.send(`Yay! your email is ${req.user}`)
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/properties', unitRouter)
app.use('/api/workorders', workorderRouter)
app.use('/api/media', mediaRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/message', messageRouter)

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
