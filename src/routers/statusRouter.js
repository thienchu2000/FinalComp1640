const express = require("express");
const router = express.Router();
const StatusController = require("../contronllers/StatusContronller");

router.get("/", StatusController.index);

module.exports = router;
