function isAdmin(req, res, next) {
  if (res.user.role === "admin") {
    next();
  } else {
    return res.send("ban khong duoc phep");
  }
}
module.exports = { isAdmin };
