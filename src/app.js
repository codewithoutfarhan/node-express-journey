const express = require("express");
const authrouter = require("./routes/auth.route");
const accountsrouter = require("./routes/accounts.routes")
const cookie = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/api/auth", authrouter);
app.use("/api/accounts", accountsrouter);

module.exports = app;