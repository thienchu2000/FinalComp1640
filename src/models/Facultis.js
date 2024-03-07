const mongoose = require("mongoose");

const Facultis = new mongoose.Schema(
  {
    nameFaculty: String,
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facultis", Facultis);
