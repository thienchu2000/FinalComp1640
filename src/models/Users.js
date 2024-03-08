const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: "65ead5df686f7f723b6dbd60",
    },

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
