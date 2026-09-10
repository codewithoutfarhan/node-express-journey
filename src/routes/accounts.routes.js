const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const accountcontroller = require("../controllers/account.controller");

const router = express.Router();

router.post("/", authMiddleware, accountcontroller.accountcreatingcontroller);

module.exports = router;
