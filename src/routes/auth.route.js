const express = require("express");
const { userregistercontroller, userloginhere } = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/register", userregistercontroller);
router.post("/login", userloginhere);

module.exports = router;
