const mongoose = require("mongoose");

const News = new mongoose.Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    title: String,
    contens: String,
    img: String,
    address: String,
    phone: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", News);
