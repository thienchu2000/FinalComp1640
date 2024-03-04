const mongoose = require("mongoose");

const Subject = new mongoose.Schema(
  {
    name_subject: String,
    start_time: Date,
    end_time: Date,
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    assignments: { type: mongoose.Schema.Types.ObjectId, ref: "Assignments" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", Subject);
