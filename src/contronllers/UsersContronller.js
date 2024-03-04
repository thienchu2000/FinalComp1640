const Users = require("../models/Users");
const bcrypt = require("bcrypt");

class UsersContronller {
  index(req, res, next) {
    return res.render("hello");
  }

  async register(req, res, next) {
    const { name, email, password, role } = req.body;
    try {
      if (!name || !email || !password || !role) {
        return res.send("Please enter correct information");
      }
      const checkEmail = await Users.findOne({ email });
      if (checkEmail) {
        return res.send("Email already exists");
      }
      if (password.length < 6) {
        return res.send("Password must be more than 6 characters");
      }
      if (!/[A-Z]/.test(password)) {
        return res.send("must have capital letters");
      }
      const hashPassword = await bcrypt.hashSync(password, 10);

      const user = new Users({
        name,
        email,
        hashPassword,
        role,
      });
      user.save();
      res.render("login");
    } catch (Err) {
      throw res.send("Err");
    }
  }
  async login(req, res, next) {}
}
module.exports = new UsersContronller();
