const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

// const docs = require('./docs/index.js')

// Require Routers
const authRouter = require('./routes/auth/')
const usersRouter = require('./routes/users')
// const propertyRouter = require('./routes/properties/property-router.js')
// const tenantHistoryRouter = require('./routes/history/tenantHistory-router.js')
// const workorderRouter = require('./routes/workorders/wo-router.js')
// const tenantsRouter = require('./routes/tenants')

// Auth Middleware
const bearerAuth = require('./lib/bearer-auth')
const requireAuth = require('./lib/require-auth')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

app.get('/protected', bearerAuth, requireAuth, (req, res) => {
  res.send(`Yay! your email is ${req.user}`)
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
// app.use('/api/properties', propertyRouter)
// app.use('/api/history', tenantHistoryRouter)
// app.use('/api/workorders', workorderRouter)
// app.use('/api/tenants', tenantsRouter)

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
