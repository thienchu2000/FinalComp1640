const mongoose = require("mongoose");

const Facultis = new mongoose.Schema(
  {
    nameFaculty: String,
    closeDate: { type: mongoose.Schema.Types.ObjectId, ref: "CloseDate" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facultis", Facultis);
