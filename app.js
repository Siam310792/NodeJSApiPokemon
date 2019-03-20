// Load our app server using express somehow ...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require("mysql")

const connection = mysql.createConnection({
  host:'localhost',
  user:'root', 
  database:'AppPokeCards'
})

app.use(morgan('short'))

app.get("/user/:id", (req, res) => {
  console.log("Fetching user with id : " + req.params.id)

  const userID = req.params.id
  const query = "SELECT * FROM User WHERE userID = ?"

  connection.query(query, [userID], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for user : " + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return { firstName : row.firstName, lastName : row.lastName }
    })

    res.json(users)
  })

  //res.end()
})

app.get("/", (request, response) => {
  console.log("Responding to root route")
  response.send("Hello from rooooot")
})

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM User", (err, rows, fields) => {
    console.log("I think we fetched users successfully")
    res.json(rows)
  })
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on port 3003")
})
