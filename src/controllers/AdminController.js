const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");
const coverData = require("../utils/coverData");
const Role = require("../models/Role");

class AdminController {
  async index(req, res, next) {
    try {
      const data = await Users.find({}).populate("role").populate("facultis");
      const role = await Role.find({});
      return res.status(200).render("admin", {
        user: true,
        admin: true,
        data: coverData(data),
        nameRole: coverData(role),
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
  update(req, res, next) {
    console.log("da vao");
    const id = req.params._id;
    const { role, faculty } = req.body;
    var obj = {};
    if (role) {
      obj.role = role;
    }
    if (faculty) {
      obj.faculty = faculty;
    }
    console.log(obj);
    Users.findOneAndUpdate({ _id: id }, obj)
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        return res.status(404).send("Error");
      });
  }
}

module.exports = new AdminController();
