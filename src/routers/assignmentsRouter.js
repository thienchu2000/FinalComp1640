const express = require("express");
const router = express.Router();
const AssignmentsController = require("../contronllers/AssignmentsContronller");

router.get("/readAss, AssignmentsController.reasAss");
router.post("/createAss", AssignmentsController.createAss);
router.get("/", AssignmentsController.index);

module.exports = router;
