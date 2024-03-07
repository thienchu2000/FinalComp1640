const AcademicYears = require("../models/AcademicYears");

class AcademicYearsController {
  index(res, req, next) {
    res.send("hello world ");
  }
}

module.exports = new AcademicYearsController();
