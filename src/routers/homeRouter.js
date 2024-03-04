const express = require("express");
const router = express.Router();
const HomeController = require("../contronllers/HomeContronller");
const UsersContronller = require("../contronllers/UsersContronller");

router.post("/register", UsersContronller.register);
router.get("/", HomeController.index);

module.exports = router;
