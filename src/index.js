// REQUIREMENTS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db")();
// SERVER CONFIF
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000" /*"https://NAMEPROJECT.netlify.app"*/],
  })
);
app.use(require("helmet")());

// ROUTES
app.use("/api/v1", require("./api"));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});