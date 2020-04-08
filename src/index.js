require('dotenv').config()
const server = require('./server')

const PORT = process.env.PORT || 4321

server.listen(PORT, () => {
  console.log(`🎧 Listening on port: ${PORT}\n\nBlasting off... 🚀`)
})
