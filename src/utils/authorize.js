const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Role = require("../models/Role");

function isAdmin(req, res, next) {
  var roleId = res.user.role;
  Role.findOne({ _id: roleId })
    .then((data) => {
      if (data.name === "Admin") {
        next();
      }
    })
    .catch((err) => {
      return res.send(err);
    });
}

function isMaketing_manager(req, res, next) {
  if (res.user.role === "Maketing Manager") {
    next();
  } else {
    return res.send("You need permission");
  }
}

function isMaketing_Coordinator(req, res, next) {
  if (res.user.role === "Maketing Coordinator") {
    next();
  } else {
    return res.send("You need permission");
  }
}

function isStudent(req, res, next) {
  if (res.user.role === "Student") {
    next();
  } else {
    return res.send("You need permission");
  }
}

function isGuest(req, res, next) {
  if (res.user.role === "Guest") {
    next();
  } else {
    return res.send("You need permission");
  }
}
module.exports = {
  isAdmin,
  isMaketing_manager,
  isMaketing_Coordinator,
  isStudent,
  isGuest,
};
