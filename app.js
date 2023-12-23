const express = require("express");
const app = express();
const createCRUDRouter = require("./routes/crudRouter.js");
const authRouter=require("./routes/authRouter.js")
require("./models/Connect.js");
const Account = require("./models/Account.js");
const Category = require("./models/Category.js");
const Product = require("./models/Product.js");
const Order = require("./models/Order.js");
const Shipping = require("./models/Shipping.js");
const Notification = require("./models/Notification.js");
const Offer = require("./models/Offer.js");
const Transaction = require("./models/Transaction.js");
const Port = 8090;
app.use(express.json());

app.use("/products", createCRUDRouter(Product));

app.use("/accounts", createCRUDRouter(Account));

app.use("/categories", createCRUDRouter(Category));

app.use("/order", createCRUDRouter(Order));

app.use("/notification", createCRUDRouter(Notification));

app.use("/Offer", createCRUDRouter(Offer));

app.use("/Shipping", createCRUDRouter(Shipping));

app.use("/Transaction", createCRUDRouter(Transaction));

app.use("/auth", authRouter);

app.use("/auth", authRouter);

app.listen(Port, () => {
  console.log(`Serveur exécuté sur le port  ${Port}`);
});

