const mongoose = require("mongoose");

const Contributions = new mongoose.Schema(
  {
    file: String,
    img: String,
    users: { type: mongoose.Schema.ObjectId, ref: "Users" },
    faculty: { type: mongoose.Schema.ObjectId, ref: "Faculty" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contributions", Contributions);
