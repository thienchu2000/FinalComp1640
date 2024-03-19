const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const Users = require("../models/Users");
const coverData = require("../utils/coverData");
const Role = require("../models/Role");
const AcademicYears = require("../models/AcademicYears");
const CloseDates = require("../models/CloseDates");
const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");

class AdminController {
  async index(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({});
      const dataAcademicyears = await AcademicYears.find({});
      const dataFacultis = await Facultis.find({});
      const data = await Users.find({})
        .populate("role")
        .populate("facultis")
        .populate("closedate");
      const role = await Role.find({});
      const sumAr = await Articles.find({})
        .populate("faculty")
        .populate("users");
      // var pusharr = [];
      // var sumAr2;
      // for (var i = 0; i < sumAr.length; i++) {
      //   var namefaculity = sumAr[i].faculty.nameFaculty;
      //   if (namefaculity) {
      //     sumAr2 = sumAr.length;
      //     pusharr.push(namefaculity, sumAr2);
      //   }
      // }
      // console.log(pusharr[0], pusharr[1]);
      var tong = data.length;
      var pusharr = [];
      var facultyCount = {};
      for (var i = 0; i < sumAr.length; i++) {
        var nameFaculty = sumAr[i].faculty.nameFaculty;
        if (nameFaculty) {
          if (!facultyCount[nameFaculty]) {
            facultyCount[nameFaculty] = 1;
          } else {
            facultyCount[nameFaculty]++;
          }
        }
      }
      for (var faculty in facultyCount) {
        pusharr.push({ name: faculty, count: facultyCount[faculty] });
      }
      var con = [];
      for (var i = 0; i < pusharr.length; i++) {
        var bao = pusharr[i].count;
        var cao = tong - bao;
        con.push(cao);
      }
      var conObj = {};
      if (con) {
        conObj.con = con;
      }
      return res.status(200).render("admin", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        sumAr: pusharr,
        tong: tong,
        Ar: conObj,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
  update(req, res, next) {
    const id = req.params._id;
    const { role, faculty, closedate } = req.body;
    var obj = {};
    if (role) {
      obj.role = role;
    }
    if (faculty) {
      obj.faculty = faculty;
    }
    if (closedate) {
      obj.closedate = closedate;
    }

    Users.findOneAndUpdate({ _id: id }, obj)
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        return res.status(404).send("Error");
      });
  }
  academic(req, res, next) {
    const { academicStart, academicEnd } = req.body;
    try {
      const academicyears = new AcademicYears({
        AcademicYears: academicStart,
        End: academicEnd,
      });
      academicyears.save();
      res.status(200).send(done);
    } catch (err) {
      return res.status(500).send("Error");
    }
  }
  deleteAcademic(req, res, next) {
    academicId = req.params;
    AcademicYears.deleteOne({ _id: ademicId })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }
  closeDate(req, res, next) {
    const academicId = req.params._id;
    const facultyId = req.params._id;
    const { closeDates, finalCloseDates } = req.body;
    try {
      const closeDates = new CloseDates({
        closeDates: closeDates,
        finalCloseDates: finalCloseDates,
        academic: academicId,
        faculty: facultyId,
      });
    } catch (err) {
      return res.status(500).send("Error");
    }
  }
  deleteCloseDates(req, res, next) {
    const closeDateId = req.params;
    AcademicYears.deleteOne({ _id: closeDateId })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }
}

module.exports = new AdminController();
