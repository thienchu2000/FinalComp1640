const express = require("express");
const router = express.Router();
const AssignmentsController = require("../contronllers/AssignmentsContronller");

router.get("/", AssignmentsController.index);

module.exports = router;
