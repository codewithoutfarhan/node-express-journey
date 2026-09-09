const express = require("express");
const authrouter = require("./routes/auth.route");
const cookie = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/api/auth", authrouter);

module.exports = app;
