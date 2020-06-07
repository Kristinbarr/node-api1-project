const express = require('express')
const db = require('./database')
const server = express()

server.use(express.json());

server.listen(8080, () => {
  console.log("\n*** server running on port 8080 ***\n")
})

server.get('/', (req,res) => {
  res.status(200).json({ message: "hello" })
  // res.send("Hello World")
})

// POST - CREATE A USER
server.post('/api/users', (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: "User info incomplete",
    })
  } else {
    const newUser = db.createUser(req.body)
    res.status(201).json(newUser)
  }
})

// GET - GET ALL USERS
server.get('/api/users', (req, res) => {
  const users = db.getUsers()
  if (!users) {
    res.status(404).json({ message: 'problem getting users' })
  } else {
    res.status(200).json(users)
  }
})

// GET - user by id
server.get('/api/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)
  if (!user) {
    res.status(404).json({ message: 'problem getting user' })
  } else {
    res.status(200).json(user)
  }
})

// PUT - update a users info with an id and request body info
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  try {
    if (!id) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!changes.name || !changes.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The user information could not be modified"})
  }
})



