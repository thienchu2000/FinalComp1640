const Subjects = require("../models/Subjects");

class SubjectsController {
  index(res, req, next) {
    res.send("hello world ");
  }
}

module.exports = new SubjectsController();
