const mongoose = require("mongoose");

const Facultys = new mongoose.Schema(
  {
    nameFaculty: String,
    startYear: Date,
    endYear: Date,
    img: String,
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facultys", Facultys);
