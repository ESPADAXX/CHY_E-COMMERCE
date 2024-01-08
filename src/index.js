// REQUIREMENTS
require("dotenv").config();
const express = require("express");

const cors = require("cors");

const session = require("express-session");
const rateLimit = require("express-rate-limit"); 

const helmet = require("helmet")



require("./config/db")();

// SERVER CONFIG
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs:15* 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
});

app.use(limiter); // Apply the rate limiter

app.use(express.json());
app.use(
  session({
    secret: process.env.SECURE_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(
  cors({
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'","http://localhost:3000"], // Add localhost:3000
        fontSrc: ["'self'"],
      },
    },
  })
);


// ROUTES
app.use("/", require("./api"));


const server=app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
module.exports = server