const mongoose = require("mongoose");

mongoose
  .connect("mongodb:localhost:27017/Ynov_ecommerce_db")
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion : ", err);
  });

module.exports = mongoose;
