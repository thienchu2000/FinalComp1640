const express = require("express");
const router = express.Router();
const SubjectsController = require("../contronllers/SubjectsContronller");

router.get("/", SubjectsController.index);

module.exports = router;
