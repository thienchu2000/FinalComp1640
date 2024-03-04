const express = require("express");
const router = express.Router();
const HomeController = require("../contronllers/HomeContronller");

router.get("/", HomeController.index);

module.exports = router;
