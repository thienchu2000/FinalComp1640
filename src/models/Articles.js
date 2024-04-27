const mongoose = require("mongoose");

const Articles = new mongoose.Schema(
  {
    articlesName: String,
    img: Array,
    doc: Array,
    description: String,
    comment: String,
    guest: { type: String, default: "false" },
    status: { type: String, default: "panding" },
    users: { type: mongoose.Schema.ObjectId, ref: "Users" },
    faculty: { type: mongoose.Schema.ObjectId, ref: "Facultis" },
    academicYears: { type: mongoose.Schema.ObjectId, ref: "AcademicYears" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", Articles);
