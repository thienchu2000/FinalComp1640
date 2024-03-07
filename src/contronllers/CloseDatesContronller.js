const CloseDates = require("../models/CloseDates");

class CloseDatesController {
  index(res, req, next) {
    res.send("hello world ");
  }
}

module.exports = new CloseDatesController();
