const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    facultis: { type: mongoose.Schema.Types.ObjectId, ref: "Facultis" },
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
    img: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", Users);
