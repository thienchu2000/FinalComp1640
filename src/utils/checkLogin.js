const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  var cookies = req.cookies["access_token"];

  if (!cookies) {
    res.redirect("/login");
  }

  var decoded = jwt.verify(cookies, "shhhh");
  res.user = decoded;

  next();
}

module.exports = checkLogin;
