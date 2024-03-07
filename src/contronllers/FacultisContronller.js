const Facultis = require("../models/Facultis");

class FacultisController {
  index(res, req, next) {
    res.send("hello world ");
  }
}

module.exports = new FacultisController();
