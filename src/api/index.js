const app = require("express")();
const accounts = require("./accounts/routes");
const products = require('./products/routes')
const offers = require('./offers/routes');
const orders = require('./order/routes');
const notifications = require('./notification/routes');
const auth=require('./authentication/routes')
app.use("/accounts", accounts);
app.use("/products", products);
app.use("/offers", offers);
app.use("/orders", orders);
app.use("/notifications",notifications)
app.use("/auth", auth)

module.exports = app;