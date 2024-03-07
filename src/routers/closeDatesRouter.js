const express = require("express");
const router = express.Router();
const CloseDatesController = require("../controllers/CloseDatesController");

router.get("/", CloseDatesController.index);

module.exports = router;
