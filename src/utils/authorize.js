function isAdmin(req, res, next) {
  if (res.user.role === "admin") {
    next();
  } else {
    return res.send("ban khong duoc phep");
  }
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
