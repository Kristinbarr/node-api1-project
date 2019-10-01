const express = require('express')
const db = require('./data/db')
const server = express()

server.use(express.json())

// GET - root test
server.get('/', (req, res) => {
  res.send('hello world')
})

// GET - all users
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
    .catch((error) => {
      res.send(error)
    })
})

// POST - insert new user to db
server.post('/api/users', (req, res) => {
  const users = req.body

  if (!users.name) {
    res.statusCode(400).json({ message: 'user name not found' })
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

// PUT - update a users info with an id
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body

  db.update(id, changes)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      res.json({ message: 'error updating user' })
    })
})

// DELETE - delete a user by id
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id

  db.remove(id)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      res.json({ message: 'error deleting user' })
    })
})

const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} ** \n`))
