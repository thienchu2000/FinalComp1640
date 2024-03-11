const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");

function authentication(req, res, next) {
  var cookies = req.cookies["access_token"];
  if (!cookies) {
    return res.render("home");
  }
  var decoded = jwt.verify(cookies, env.jjwt);
  res.locals = decoded;
  next();
}

module.exports = authentication;
