const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");

class HomeController {
  index(req, res, next) {
    var id = res.locals._id;
    Users.findOne({ _id: id })
      .populate("role")
      .then((data) => {
        if (id && data.role.name === "Admin") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            admin: data.role.name,
          });
        } else if (id && data.role.name === "Student") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            student: data.role.name,
          });
        } else if (id && data.role.name === "Marketing Coordinator") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            marketingCoordinator: data.role.name,
          });
        } else if (id && data.role.name === "Marketing Manager") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            marketingManager: data.role.name,
          });
        } else if (id && data.role.name === "Guest") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            guest: data.role.name,
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
