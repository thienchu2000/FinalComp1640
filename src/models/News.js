const mongoose = require("mongoose");

const News = new mongoose.Schema(
  {
    users: { type: mongoose.Schema.Type.OjectId, ref: "Users" },
    contens: String,
    img: String,
    address: String,
    phone: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", News);
