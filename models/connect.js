const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo:27017/chy_ecommerce_db")
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion : ", err);
  });

module.exports = mongoose;
