const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Role", Role);
