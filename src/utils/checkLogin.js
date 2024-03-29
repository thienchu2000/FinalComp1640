const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");

function checkLogin(req, res, next) {
  var cookies = req.cookies["access_token"];
  if (!cookies) {
    return res.redirect("/users/login");
  }
  var decoded = jwt.verify(cookies, env.jjwt);
  res.user = decoded;
  next();
}

module.exports = checkLogin;
