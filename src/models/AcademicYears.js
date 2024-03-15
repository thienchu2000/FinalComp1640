const mongoose = require("mongoose");

const AcademicYears = new mongoose.Schema({
  AcademicYears: String,
});

module.exports = mongoose.model("AcademicYears", AcademicYears);
