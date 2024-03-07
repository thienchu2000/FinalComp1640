const mongoose = require("mongoose");

const Status = new mongoose.Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    articles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
    },
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", Status);
