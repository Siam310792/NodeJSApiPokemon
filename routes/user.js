//Will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get('/messages', (req, res) => {
    console.log("11111111")
    res.end()
})

const pool = mysql.createPool({
    connectionLimit : 10,
    host:'us-cdbr-iron-east-03.cleardb.net',
    user:'b563ebb074fddc', 
    password:'58768aea',
    database:'heroku_17896436139a2c1'
})

function getConnection() {
    return pool
  }

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data ???")
  
    console.log("First name : " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
  
    const query = "INSERT INTO Users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(query, [firstName, lastName], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user : " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new user with id : ", results.insertId);
      res.end()
    } )
  
  
    res.end()
  })
  
  router.get("/user/:id", (req, res) => {
    console.log("Fetching user with id : " + req.params.id)
  
    const userID = req.params.id
    const query = "SELECT * FROM Users WHERE userID = ?"
  
    const connection = getConnection()
  
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
  
  
  
  router.get("/users", (req, res) => {
    const connection = getConnection() 
  
    connection.query("SELECT * FROM Users", (err, rows, fields) => {
      if (err) {
        console.log("There is an error")
      }
      console.log("I think we fetched users successfully")
      res.json(rows)
    })
  })

module.exports = router