const mongoose = require("mongoose");

const Assignments = new mongoose.Schema(
  {
    submitsions: String,
    subjects: { type: mongoose.Schema.ObjectId, ref: "Subject" },
    users: { type: mongoose.Schema.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignments", Assignments);
