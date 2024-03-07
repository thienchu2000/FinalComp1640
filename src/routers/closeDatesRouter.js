const express = require("express");
const router = express.Router();
const CloseDatesContronller = require("../contronllers/CloseDatesContronller");

router.get("/", CloseDatesContronller.index);

module.exports = router;
