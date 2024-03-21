const express = require("express");
const router = express.Router();
const GuestController = require("../controllers/GuestController");
const { isGuest } = require("../utils/authorize");

router.get("/", isGuest, GuestController.index);

module.exports = router;
