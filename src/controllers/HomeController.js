const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");

class HomeController {
  index(req, res, next) {
    var id = res.locals._id;
    var name = res.locals.name;
    if (id) {
      return res.render("home", { user: true, name: name, _id: id });
    } else {
      return res.render("home");
    }
  }
}
module.exports = new HomeController();
