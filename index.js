const express = require('express')
const db = require('./data/db')
const server = express()

server.use(express.json())

// GET root test
server.get('/', (req, res) => {
  res.send('hello world')
})

// GET users
server.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.send(users)
    })
    .catch((error) => {
      res.send(error)
    })
})

const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} ** \n`))
