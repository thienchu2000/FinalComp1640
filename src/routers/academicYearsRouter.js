const express = require("express");
const router = express.Router();
const AcademicYearsController = require("../controllers/AcademicYearsController");

router.get("/", AcademicYearsController.index);

module.exports = router;
