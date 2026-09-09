require("dotenv").config();
const dns = require("dns");

dns.setServers(["1.1.1.1"]);

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database is connected !!");
    })
    .catch((error) => {
      console.log("Database connection error:", error);
    });
}

module.exports = connectDB;
