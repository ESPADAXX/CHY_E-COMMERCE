const app = require("express")();
const accounts = require("./accounts/routes");
const products = require('./products/routes')
app.use("/accounts", accounts);
app.use("/products", products);

module.exports = app;