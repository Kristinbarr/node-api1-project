const express = require('express')
const server = express()

const router = require("./routes/userRouter")

const port = 4040
server.use(express.json())
server.use(router)

server.listen(port, () => {
    console.log(`\n*** server running on port ${port} ***\n`)
  })
