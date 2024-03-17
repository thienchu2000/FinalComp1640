const mongoose = require("mongoose");

const Articles = new mongoose.Schema(
  {
    articlesName: String,
    img: Array,
    doc: Array,
    description: String,
    users: { type: mongoose.Schema.ObjectId, ref: "Users" },
    faculty: { type: mongoose.Schema.ObjectId, ref: "Faculty" },
    status: { type: mongoose.Schema.ObjectId, ref: "Status" },
    academicYears: { type: mongoose.Schema.ObjectId, ref: "AcademicYears" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", Articles);
