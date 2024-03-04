const mongoose = require("mongoose");

const Feedback = new mongoose.Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    assignments: { type: mongoose.Schema.Types.ObjectId, ref: "Assignments" },
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", Feedback);
