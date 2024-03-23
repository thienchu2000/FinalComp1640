const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");
const Articles = require("../models/Articles");

class HomeController {
  async index(req, res, next) {
    var result = await Articles.find({}).populate("faculty");
    var findTrue = result
      .filter((item) => {
        return item.status === "true";
      })
      .map((item) => {
        return {
          articlesName: item.articlesName,
          img: item.img,
          doc: item.doc,
          description: item.description,
          nameFaculty: item.faculty.nameFaculty,
          createdAt: item.createdAt,
        };
      });
    var id = res.locals._id;
    Users.findOne({ _id: id })
      .populate("role")
      .then((data) => {
        if (id && data.role.name === "Admin") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            admin: data.role.name,
            admin: true,
            findTrue: findTrue,
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        } else if (id && data.role.name === "Student") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            student: data.role.name,
            student: true,
            findTrue: findTrue,
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        } else if (id && data.role.name === "Marketing Coordinator") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            marketingCoordinator: data.role.name,
            coordinator: true,
            findTrue: findTrue,
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        } else if (id && data.role.name === "Marketing Manager") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            marketingManager: data.role.name,
            findTrue: findTrue,
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        } else if (id && data.role.name === "Guest") {
          res.render("home", {
            user: true,
            name: data.name,
            id: data._id,
            guest: data.role.name,
            findTrue: findTrue,
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        } else {
          res.render("home", {
            back: "https://wallpapercave.com/wp/wp10866884.jpg",
          });
        }
      })
      .catch((err) => {
        return res.send(err);
      });
  }
}
module.exports = new HomeController();
