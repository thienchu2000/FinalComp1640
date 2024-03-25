const Users = require("../models/Users");
const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");
const coverData = require("../utils/coverData");

class GuestController {
  async index(req, res, next) {
    var user = res.user;
    var id = user._id;
    try {
      const query = await Users.findOne({ _id: id }).populate("facultis");
      if (query.facultis === undefined || query.facultis === null) {
        return res.render("error");
      }
      var name = query.facultis.nameFaculty;

      const query2 = (await Articles.find({}).populate("faculty"))
        .filter((item) => {
          return item.faculty.nameFaculty === name;
        })
        .map((item) => {
          return item;
        });
      res.render("guest", {
        user: true,
        guest: true,
        img: query.img,
        name: query.name,
        dataGuest: coverData(query2),
        nameFa: name,
        back: "https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg",
      });
    } catch (err) {
      return res.send("error){");
    }
  }
}

module.exports = new GuestController();
