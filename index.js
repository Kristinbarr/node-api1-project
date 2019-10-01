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

// GET - get a single user by id
server.get('/api/users/:id', (req, res) => {
  const user = req.params.id

    db.findById(user)
    .then((user) => {
      res.send(user)
    })
    .catch(error => {
      res.send(error)
    })
})

// POST - insert new user to db
server.post('/api/users', (req, res) => {
  const users = req.body

  if (!users.name) {
    res.statusCode(400).json({message: 'users name not found'})
  } else {
  db.insert(users)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      res.json({ message: 'error saving user' })
    })
    }
})



const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} ** \n`))
