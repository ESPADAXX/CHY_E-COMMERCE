const { connect } = require("mongoose");
require("dotenv").config();
// Database Connection

const connectDB = async () => {
  await connect(process.env.DB_CONNECTION_STRING).then(() => {  
    console.log(`MongoDB Connected successfully 🍃`);
  });
};

module.exports = connectDB;
// brew services start mongodb-community@7.0
// brew services stop mongodb-community@7.0