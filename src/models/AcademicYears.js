const mongoose = require("mongoose");

const AcademicYears = new mongoose.Schema({
  academicYears: Date,
  End: Date,
});

module.exports = mongoose.model("AcademicYears", AcademicYears);
