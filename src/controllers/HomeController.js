const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");

class HomeController {
  index(req, res, next) {
    var id = res.locals._id;
    Users.findOne({ _id: id })
      .populate("role")
      .then((data) => {
        if (id) {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            admin: data.role.name,
          });
        } else {
          res.render("home");
        }
      })
      .catch((err) => {
        return res.send(err);
      });
  }
}
module.exports = new HomeController();
