const Users = require("../models/Users");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { env } = require("../config/environment");

class UsersContronller {
  index(req, res, next) {
    res.render("home");
  }

  register(req, res, next) {
    res.render("register");
  }

  async dk(req, res, next) {
    const { name, email, password, address, phone, img } = req.body;
    try {
      if (!name || !email || !password) {
        return res.send("Please enter correct information");
      }
      const checkEmail = await Users.findOne({ email });
      if (checkEmail) {
        return res.status(400).send("Email already exists");
      }
      if (password.length < 6) {
        return res.status(400).send("Password must be more than 6 characters");
      }
      if (!/[A-Z]/.test(password)) {
        return res.status(400).send("must have capital letters");
      }
      const hashPassword = await bcrypt.hashSync(password, 10);
      const user = new Users({
        name,
        email,
        password: hashPassword,
        address,
        phone,
        img,
      });
      user.save();
      res.status(200).redirect("login");
    } catch (Err) {
      console.log(Err);
      return res.send("Err");
    }
  }

  login(req, res, next) {
    res.render("login", { message: "Sign up succsess" });
  }

  async dn(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send("Please enter correct information");
      }
      const check = await Users.findOne({ email });
      if (!check) {
        return res.status(400).send("Account does not exist");
      }
      console.log(check);

      await bcrypt.compare(password, check.password, function (Error, Result) {
        if (!Result) {
          return res.status(400).send("Incorrect password");
        }
        var token = jwt.sign(
          {
            name: check.name,
            email: check.email,
            role: check.role,
          },
          env.jjwt
        );
        console.log("đây là cookies", token);
        res.cookie("access_token", token);
        res.redirect("/");
      });
    } catch (Error) {
      return res.send("Error");
    }
  }
  logout(req, res, next) {
    res.clearCookie("access_token");
    return res.redirect("/");
  }
}
module.exports = new UsersContronller();
