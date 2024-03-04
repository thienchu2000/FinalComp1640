const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { env } = require("./config/environment");

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
        password: hashPassword,
        role,
      });
      user.save();
      res.send("login");
    } catch (Err) {
      console.log(Err);
      return res.send("Err");
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.send("Please enter correct information");
      }
      const check = await Users.findOne({ email });
      if (!check) {
        return res.send("Account does not exist");
      }

      const checkPass = bcrypt.compare(
        password,
        check.password,
        function (Error, Result) {
          var token = jwt.sign(
            {
              name: check.name,
              email: check.email,
              password: check.password,
              role: check.role,
            },
            env.jwt
          );
          res.cookie("access_token", token);
          res.redirect("/");
        }
      );
    } catch (Error) {
      return res.send("Error");
    }
  }
  logout(req, res, next) {
    res.claercookie("access_token");
    return res.redirect("/");
  }
}
module.exports = new UsersContronller();
