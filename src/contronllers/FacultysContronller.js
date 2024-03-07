const Facultys = require("../models/Facultys");

class FacultysController {
  index(res, req, next) {
    res.send("hello world ");
  }
}

module.exports = new FacultysController();
