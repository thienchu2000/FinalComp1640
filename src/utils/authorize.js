function isAdmin(req, res, next) {
  if (res.user.role === "admin") {
    next();
  } else {
    return res.send("ban khong duoc phep");
  }
}

function isMaketing_manager(req, res, next) {
  if (res.user.role === "maketingmanager") {
    next();
  } else {
    return res.send("ban khong duoc");
  }
}

function isMaketing_Coordinator(req, res, next) {
  if (res.user.role === "maketingcoordinator") {
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

function isGuest(req, res, next) {
  if (res.user.role === "guest") {
    next();
  } else {
    return res.send("ban khong duoc");
  }
}
module.exports = {
  isAdmin,
  isMaketing_manager,
  isMaketing_Coordinator,
  isStudent,
  isGuest,
};
