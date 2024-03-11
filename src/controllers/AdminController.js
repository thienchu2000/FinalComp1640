const Status = require("../models/Status");

class AdminController {
  index(res, req, next) {
    res.send("Welcome");
  }
}

module.exports = new AdminController();
