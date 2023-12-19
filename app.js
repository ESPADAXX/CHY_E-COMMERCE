const express = require("express");
const app = express();
const createCRUDRouter=require('./server/server.js')
require("./connect");
const Account = require();
const Category = require();
const Product = require();
const Order = require();
const Shipping = require();
const Notification = require();
const Offer = require();
const Transaction = require();
const Port = 8080;
app.use(express.json());

app.use('/products', createCRUDRouter(Product));

app.use('/accounts', createCRUDRouter(Account));

app.use('/categories', createCRUDRouter(Category));

app.use('/order', createCRUDRouter(Order));

app.use('/notification', createCRUDRouter(Notification));

app.use('/Offer', createCRUDRouter(Offer));

app.use('/Offer', createCRUDRouter(Shipping));

app.use('/Offer', createCRUDRouter(Transaction));


app.listen(Port, () => {
  console.log(`Serveur exécuté sur le port  ${Port}`);
});
