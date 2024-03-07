const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  facultys: { type: mongoose.Schema.Types.ObjectId, ref: "Facultys" },
  contributions: { type: mongoose.Schema.Types.ObjectId, ref: "Contributions" },
  name: { type: String },
  email: String,
  password: String,
  phone: Number,
  address: String,
  img: String,
});

module.exports = mongoose.model("Users", Users);
