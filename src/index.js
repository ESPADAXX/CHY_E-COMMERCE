// REQUIREMENTS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const rateLimit = require("express-rate-limit"); 
const helmet = require("helmet")
const bodyParser=require('body-parser')
require("./config/db")();

// SERVER CONFIG
const app = express();
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);
// Rate limiting middleware
const limiter = rateLimit({
  windowMs:15* 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 50 requests per windowMs
});

app.use(limiter); // Apply the rate limiter

app.use(express.json());
app.use(
  session({
    secret: process.env.SECURE_KEY_SESSION,
    resave: false,
    saveUninitialized: false,
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

app.get('/test', (req, res) => {
  return res.json({data:'salalmslajfdlam'})
})

const server=app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
module.exports = server