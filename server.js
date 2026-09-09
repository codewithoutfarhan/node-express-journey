require("dotenv").config();

const app = require("./src/app");
const connectdb = require("./src/config/db");
const userschema = require("./src/models/user.model");
connectdb();

app.listen(2000, () => {
  console.log(" server is running port no  2000");
});
