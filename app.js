const express = require("express");
const app = express();
require("./connect");
const Account = require();
const Category = require();
const Product = require();
const Order = require();
const Shipping = require();
const Notification = require();
const Offer = require();
const Transaction = require();
const Port = 3000;

app.listen(Port, () => {
  console.log(`Serveur exécuté sur le port  ${Port}`);
});
