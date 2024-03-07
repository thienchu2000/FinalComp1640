const Status = require("../models/Status");

class StatusController {
  index(res, req, next) {
    res.send("Welcome");
  }
}

module.exports = new StatusController();
