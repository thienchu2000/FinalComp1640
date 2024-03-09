const db = require("../config/db");

class HomeController {
  index(req, res, next) {
    return res.render("home");
  }
}
module.exports = new HomeController();
