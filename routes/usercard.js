//Will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

//Connexion à la bdd
const pool = mysql.createPool({
    connectionLimit : 11,
    host:'us-cdbr-iron-east-03.cleardb.net',
    user:'b563ebb074fddc', 
    password:'58768aea',
    database:'heroku_17896436139a2c1'
})


function getConnection() {
    return pool
  }
  

router.get('/messages', (req, res) => {
    console.log("11111111")
    res.end()
})



  //get pour récupérer les cartes d'un utilisateur
  router.get("/user/:userid/cards", (req, res) => {
  
      const queryString = "SELECT id,pokemonCard_Id,nbExemplaire,user_id from usercard inner JOIN user on usercard.user_id = user.id  WHERE usercard.user_id = ?"
      connectionAsync.query(queryString,[utilisateurId]) => {
        if (err){
          console.log("error " + err)
          res.sendStatus(204)
          return
        }
        const plante = rows.map((row) => {
          return {idPlante:row.idPlante, nomFr:row.nomFr,nomLatin:row.nomLatin, usageMilieu:row.usageMilieu,
            image :{idImage:row.id_image,url:row.url}}
        })
        res.json(plante)
      }) 
     
  })


  //get pour récupérer une carte d'un utilisateur
  router.get("/user/:userid/card/:id",(req,res) => {
  
    const pokemoncardID = req.params.id
    const query = "SELECT * FROM pokemoncard WHERE id = ?"
  
    const connection = getConnection()
  
    connection.query(query, [pokemoncardID], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for pokemoncard : " + err)
        res.sendStatus(500)
        res.end()
        return
      }
      console.log("I think we fetched users successfully")
  
      const users = rows.map((row) => {
        return { firstName : row.first_name, lastName : row.last_name }
      })
  
      res.json(users)
    })
  
    //res.end()
  }) 

  async function getCardsById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.pokemontcg.io/v1/cards/" + id )
        .then(response => resolve(response))
        .catch(error => {
          console.log("erreur", error);
          reject({
            code: 502,
            message: error.response.data.error
          });
        });
    });
  }



module.exports = router