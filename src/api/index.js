const app = require("express")();
const accounts = require("./accounts/routes");
const categories = require("./categories/routes");
const products = require('./products/routes')
const offers = require('./offers/routes');
const orders = require('./orders/routes');
const transactions = require('./transactions/routes');
const notifications = require('./notifications/routes');
const shippings = require('./shippings/routes');
const auth=require('./authentication/routes');

app.use("/accounts", accounts);
app.use("/categories", categories);
app.use("/products", products);
app.use("/offers", offers);
app.use("/orders", orders);
app.use("/transactions", transactions);
app.use("/notifications",notifications);
app.use("/shippings",shippings);
app.use("/auth", auth);

module.exports = app;