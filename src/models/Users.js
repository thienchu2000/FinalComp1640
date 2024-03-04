const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  news: { type: mongoose.Schema.Types.ObjectId, ref: "News" },
  name: { type: String },
  email: String,
  password: String,
  phone: Number,
  address: String,
  img: String,
});

module.exports = mongoose.model("Users", Users);
