const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    contributions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contributions",
    },
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", Comments);
