const Users = require("../models/Users");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { env } = require("../config/environment");
const checkLogin = require("../utils/checkLogin");
const axios = require("axios");

class UsersController {
  index(req, res, next) {
    res.render("home", {
      back: "https://wallpapercave.com/wp/wp10866884.jpg",
    });
  }

  register(req, res, next) {
    res.render("register", {
      back: "https://png.pngtree.com/background/20230520/original/pngtree-the-dark-background-is-filled-with-triangles-and-dots-picture-image_2679996.jpg",
    });
  }

  async dk(req, res, next) {
    const {
      name,
      email,
      password,
      address,
      phone,
      roleTreatment,
      facultyWant,
    } = req.body;
    try {
      if (!name || !email || !password || !roleTreatment || !facultyWant) {
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
        roleTreatment,
        facultis: facultyWant,
      });
      user.save();

      res.status(200).render("login", { email });
    } catch (Err) {
      console.log(Err);
      return res.send("Err");
    }
  }

  login(req, res, next) {
    res.render("login", {
      message: "Sign up succsess",
      back: "https://png.pngtree.com/background/20230520/original/pngtree-the-dark-background-is-filled-with-triangles-and-dots-picture-image_2679996.jpg",
    });
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

      await bcrypt.compare(password, check.password, function (Error, Result) {
        if (!Result) {
          return res.status(400).send("Incorrect password");
        }
        var token = jwt.sign(
          {
            _id: check._id,
            name: check.name,
            email: check.email,
            role: check.role,
            img: check.img,
          },
          env.jjwt
        );
        res.cookie("access_token", token);
        res.render("home", {
          user: true,
          name: check.name,
          _id: check._id,
          img: check.img,
          role: check.role,
          back: "https://wallpapercave.com/wp/wp10866884.jpg",
        });
      });
    } catch (Error) {
      return res.send("Error");
    }
  }
  logout(req, res, next) {
    res.clearCookie("access_token");
    return res.redirect("/");
  }

  async Find(req, res, next) {
    var cookies = req.cookies["access_token"];
    if (!cookies) {
      res.redirect("/users/login");
    }
    var decoded = jwt.verify(cookies, env.jjwt);
    var id = decoded._id;
    try {
      const findUser = await Users.findOne({ _id: id }).populate("role");
      if (!findUser) {
        return res.send("Error");
      }

      res.render("profileUser", {
        user: true,
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
        address: findUser.address,
        role: findUser.role.name,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        img: findUser.img,
        back: "https://img.freepik.com/free-photo/thick-twirling-smoke-pattern-corner-black-background_23-2148092641.jpg",
      });
    } catch (error) {
      console.log(error);
      return res.send("error");
    }
  }

  async updateUser(req, res, next) {
    const _id = req.params._id;
    const user = await Users.findOne({ _id: _id })
      .then((data) => {
        res.render("updateUser", {
          user: true,
          name: data.name,
          _id: data._id,
          img: data.img,
          back: "https://img.freepik.com/free-photo/thick-twirling-smoke-pattern-corner-black-background_23-2148092641.jpg",
        });
      })
      .catch((error) => {
        return res.send(error);
      });
  }

  changeUser(req, res, next) {
    const _id = req.params._id;
    var img = req.file.filename;
    var user = {};
    var von = { ...req.body };
    if (von.name) {
      user.name = von.name;
    }
    if (von.lastName) {
      user.lastName = von.lastName;
    }
    if (von.firstName) {
      user.firstName = von.firstName;
    }
    if (von.phone) {
      user.phone = von.phone;
    }
    if (von.address) {
      user.address = von.address;
    }
    if (img) {
      user.img = img;
    }

    Users.findOneAndUpdate({ _id: _id }, user)
      .then(() => {
        res.status(200).redirect("/users/find");
      })
      .catch((err) => {
        return res.status(404).send(err);
      });
  }
}

module.exports = new UsersController();
