const db = require("../config/db");

class UsersContronller {
  index(req, res, next) {
    return res.render("hello");
  }
}
module.exports = new UsersContronller();
