const express = require('express')
const db = require('../database')

const router = express.Router()

// TEST ROOT
router.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

// GET - returns all users
router.get("/api/users", (req, res) => {
  try {
    const users = db.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})

// GET - returns a user with an ID
router.get("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id
    const user = db.getUserById(id)
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }
})

// POST - creates a new user with sent info
router.post("/api/users", (req, res) => {
  const userName = req.body.name
  const userBio = req.body.bio

  try {
    if (!userName || !userBio) {
      res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      const user = db.createUser({userName, userBio})
      res.status(201).json(user)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
})

// PUT - update a user's info with ID and sent info
router.put("/api/users/:id", (req,res) => {
  const id = req.params.id
  const newInfo = req.body
  try {
    if (!id) {
      res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    } else if (!newInfo.name || !newInfo.bio) {
      res.status(400).json({ errorMessage:  "Please provide name and bio for the user." })
    } else {
      const updatedUser = db.updateUser(id, newInfo)
      res.status(200).json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The user information could not be modified." })
  }
})

// DELETE - delete a user by the ID
router.delete("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id
    const user = db.getUserById(id)
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    res.status(200).json({ message: "he gone" })
  } catch (error) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }
})

module.exports = router
