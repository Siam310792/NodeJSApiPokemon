// Load our app server using express somehow ...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require("mysql")

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('./public'))

app.use(morgan('short'))

const router = require('./routes/user.js')
const router = require('./routes/cards.js')
const router = require('./routes/usercard.js')

app.use(router)

app.get("/", (request, response) => {
  console.log("Responding to root route")
  response.send("Hello from rooooot")
})

const PORT = process.env.PORT || 3003
// localhost:3003
app.listen(PORT, () => {
  console.log("Server is up and listening on : " + PORT)
})
