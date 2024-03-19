const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");
const Users = require("../models/Users");
const CloseDates = require("../models/CloseDates");
const AcademicYears = require("../models/AcademicYears");
const Role = require("../models/Role");
const covertData = require("../utils/coverData");

class CoordinatorController {
  async index(req, res, next) {
    var userId = res.user._id;
    try {
      const namefaculty = await Users.findOne({ _id: userId }).populate(
        "facultis"
      );
      var idFaculty = namefaculty.facultis._id;

      const userfaculty = await Users.find({}).populate("facultis");

      var checkId = userfaculty
        .filter((item) => {
          return item.facultis && item.facultis._id.equals(idFaculty);
        })
        .map((item) => {
          return item._id;
        });
      var chuyenId = checkId;
      const findArticle = await Articles.find({ users: chuyenId }).populate(
        "users"
      );

      res.render("coordinator", {
        user: true,
        img: res.user.img,
        coordinator: true,
        findArticle: covertData(findArticle),
      });
    } catch (err) {
      console.log(err);
      return res.send("err");
    }
  }

  async updateAr(req, res, next) {
    const id = res.user._id;
    const { articlesId } = req.params;
    const { comment, description, status } = req.body;
    console.log(req.body);
    var chuyenBoo;
    if (status === "true" && status !== null) {
      chuyenBoo = true;
    }
    if (status === "false" && status !== null) {
      chuyenBoo = false;
    }
    try {
      var checkIdStudent = await Articles.findOne({ _id: articlesId }).populate(
        "users"
      );
      var nameStudent = checkIdStudent.users._id;
      var dateSubmission = checkIdStudent.createdAt;
      var newdate = new Date();
      var newdateTime = newdate.getTime();
      var timeSubmission = dateSubmission.getTime();
      var cover = (newdateTime - timeSubmission) / (3600 * 1000 * 24);
      // console.log(cover);
      if (cover > 14) {
        return res.status(400).send("Out of date");
      }
      var done = Articles.findOneAndUpdate(
        { _id: articlesId },
        { coordinator: id, comment, description, status: chuyenBoo }
      ).then((data) => {
        res.status(200).send("done");
      });
    } catch (err) {
      console.log(err);
      return res.send("err");
    }
  }
}

module.exports = new CoordinatorController();
