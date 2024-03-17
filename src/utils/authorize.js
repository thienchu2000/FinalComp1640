const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Role = require("../models/Role");

function isAdmin(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Admin") {
        next();
      } else {
        return res.send("You need permission");
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}

function isMarketing_manager(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Marketing Manager") {
        next();
      } else {
        return res.send("You need permission");
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}

function isMarketing_Coordinator(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Marketing Coordinator") {
        next();
      } else {
        return res.send("You need permission");
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}

function isStudent(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Student") {
        next();
      } else {
        return res.send("You need permission");
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}

function isGuest(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Guest") {
        next();
      } else {
        return res.send("You need permission");
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}
module.exports = {
  isAdmin,
  isMarketing_manager,
  isMarketing_Coordinator,
  isStudent,
  isGuest,
};
