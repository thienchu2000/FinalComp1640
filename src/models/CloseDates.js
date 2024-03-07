const mongoose = require("mongoose");

const CloseDates = new mongoose.Schema({
  Faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Facultis" },
  academic: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYears" },
  closeDates: Date,
  finalCloseDates: Date,
});

module.exports = mongoose.model("CloseDates", CloseDates);
