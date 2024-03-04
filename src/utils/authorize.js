function isAdmin(req, res, next) {
  if (res.user.role === "admin") {
    next();
  } else {
    return res.send("ban khong duoc phep");
  }
}

function isStaff(req, res, next) {
  if (res.user.role === "staff") {
    next();
  } else {
    return res.send("ban khong duoc");
  }
}

function isStudent(req, res, next) {
  if (res.user.role === "student") {
    next();
  } else {
    return res.send("ban khong duoc");
  }
}

function isTeacher(req, res, next) {
  if (res.user.role === "teacher") {
    next();
  } else {
    return res.send("ban khong duoc");
  }
}
module.exports = { isAdmin, isStaff, isStudent, isTeacher };
