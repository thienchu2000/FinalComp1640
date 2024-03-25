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
  async bestArticle(req, res, next) {
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
    res.render("bestAr", {
      user: true,
      findTrue: findTrue,
      back: "https://media.istockphoto.com/id/1180170441/vi/anh/tr%E1%BB%A5c-tr%E1%BA%B7c-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91-r%C3%B2-r%E1%BB%89-tinh-th%E1%BB%83-v%C3%A0-v%E1%BA%BFt-n%E1%BB%A9t-tr%C3%AAn-m%C3%A0n-h%C3%ACnh-lcd-b%E1%BB%8B-h%E1%BB%8Fng-m%C3%A0n-h%C3%ACnh-m%C3%A1y-t%C3%ADnh.jpg?b=1&s=612x612&w=0&k=20&c=SKE37-FPSinpK7J_xc9l7Ksm99X0kHN_HHoNkwVJ67Y=",
    });
  }
}
module.exports = new HomeController();
