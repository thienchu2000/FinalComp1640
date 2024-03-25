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
      var idFaculty;
      if (namefaculty.facultis === undefined || namefaculty.facultis === null) {
        idFaculty = "1";
      } else if (namefaculty.facultis) {
        idFaculty = namefaculty.facultis._id;
      }
      var a = "Note: You don't have a faculty to manage ";
      if (idFaculty === "1") {
        return res.render("coordinator", {
          user: true,
          img: res.user.img,
          coordinator: true,
          a: a,
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      }

      const userfaculty = await Users.find({}).populate("facultis");

      var checkId = userfaculty
        .filter((item) => {
          return item.facultis && item.facultis._id.equals(idFaculty);
        })
        .map((item) => {
          return item._id;
        });
      var b = "There are currently no students in the faculty";
      var chuyenId;
      if (checkId === undefined || checkId === null) {
        checkId = "2";
      } else {
        chuyenId = checkId;
      }

      if (checkId === "2") {
        res.render("coordinator", {
          user: true,
          img: res.user.img,
          coordinator: true,
          b: b,
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      } else if (checkId) {
        const findArticle = await Articles.find({ users: chuyenId }).populate(
          "users"
        );

        res.render("coordinator", {
          user: true,
          img: res.user.img,
          coordinator: true,
          findArticle: covertData(findArticle),
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      }
    } catch (err) {
      console.log(err);
      return res.send("err");
    }
  }

  async updateAr(req, res, next) {
    const id = res.user._id;
    const { articlesId } = req.params;
    const { comment, description, status } = req.body;

    const checkFa = await Users.findOne({ _id: id }).populate("facultis");
    var layname = checkFa.facultis.nameFaculty;
    const ar = await Articles.find({}).populate("faculty");
    var checkt = ar
      .filter((item) => {
        return item.status === true && item.faculty.nameFaculty === layname;
      })
      .map((item) => {
        return item.status;
      });

    if (checkt.length >= 3 && status === "true") {
      return res.status(400).send("err");
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
        { coordinator: id, ...req.body }
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
