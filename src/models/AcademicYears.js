const mongoose = require("mongoose");

const AcademicYears = new mongoose.Schema({
  AcademicYears: Date,
});

module.exports = mongoose.model("AcademicYears", AcademicYears);