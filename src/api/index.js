const app = require("express")();
const accounts = require("./accounts/routes");
const category = require("./category/routes");
const products = require('./products/routes')
const offers = require('./offers/routes');
const orders = require('./order/routes');
const transaction = require('./transaction/routes');
const notifications = require('./notification/routes');
const shipping = require('./shipping/routes');
const auth=require('./authentication/routes')

app.use("/accounts", accounts);
app.use("/category", category);
app.use("/products", products);
app.use("/offers", offers);
app.use("/orders", orders);
app.use("/transactions", transaction);
app.use("/notifications",notifications);
app.use("/shippings",shipping);
app.use("/auth", auth)

module.exports = app;