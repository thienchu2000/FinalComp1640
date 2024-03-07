const express = require("express");
const router = express.Router();
const AcademicYearsContronller = require("../contronllers/AcademicYearsContronller");

router.get("/", AcademicYearsContronller.index);

module.exports = router;
