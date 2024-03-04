const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  name: string,
});

module.exports = mongoose.model("Role", Role);
