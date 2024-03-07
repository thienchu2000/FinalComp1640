const express = require("express");
const router = express.Router();
const ContributionsController = require("../contronllers/ContributionsContronller");

router.get("/readAss", ContributionsController.readAss);
router.post("/createAss", ContributionsController.createAss);
router.get("/", ContributionsController.index);

module.exports = router;
