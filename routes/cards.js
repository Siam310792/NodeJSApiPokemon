//Will contain all of my user related routes
const express = require('express')
const router = express.Router()


  //get pour le fetchAllUserCards BDD (avec le nom comme paramètre pour le filtre)
  router.get("/cards", (req, res) => {
    getCardsById(req.params.name)
    .then(response => {
      res.json(response);
    })
    .catch(error => res.json(error));
  }) 
  
  async function getCardsById() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.pokemontcg.io/v1/" )
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