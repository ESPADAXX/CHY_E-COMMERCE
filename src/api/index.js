const app = require("express")();
const accounts = require("./accounts/routes");
const products = require('./products/routes')
const offers = require('./offers/routes');
const orders = require('./orders/routes');
const notifications = require('./notifications/routes');
const auth=require('./authentication/routes')
app.use("/accounts", accounts);
app.use("/products", products);
app.use("/offers", offers);
app.use("/orders", orders);
app.use("/notifications",notifications)
app.use("/auth", auth)

module.exports = app;