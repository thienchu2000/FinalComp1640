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

      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
      const dataAcademicyears = await AcademicYears.find({});
      const dataFacultis = await Facultis.find({});
      const data = await Users.find({}).populate("role").populate("facultis");

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
      // console.log("loi");
      // var tong = data.length;
      // var pusharr = [];
      // var facultyCount = {};
      // for (var i = 0; i < sumAr.length; i++) {
      //   var nameFaculty = sumAr[i].faculty.nameFaculty;
      //   if (nameFaculty) {
      //     if (!facultyCount[nameFaculty]) {
      //       facultyCount[nameFaculty] = 1;
      //     } else {
      //       facultyCount[nameFaculty]++;
      //     }
      //   }
      // }
      // for (var faculty in facultyCount) {
      //   pusharr.push({ name: faculty, count: facultyCount[faculty] });
      // }

      // var checkfa = sumAr.length;
      // var checkUser = {};
      // var sumUser = [];
      // for (var i = 0; i < sumAr.length; i++) {
      //   var idUser = sumAr[i].users._id;
      //   if (idUser) {
      //     if (!checkUser[idUser]) {
      //       checkUser[idUser] = 1;
      //     } else {
      //       checkUser[idUser]++;
      //     }
      //   }
      // }
      // for (var id in checkUser) {
      //   sumUser.push({ id: id, count: checkUser[idUser] });
      // }
      // console.log(checkUser);

      // console.log(sumUser);
      //*** */ var checkfa = await Articles.aggregate([
      //   {
      //     $group: { _id: "$users", count: { $sum: 1 } },
      //   },
      //   {
      //     $sortByCount: "$_id",
      //   },
      // ]);

      // var sumUser = tong - checkfa.length;

      // var checkCmt = (await Articles.find({}))
      //   .filter((item) => {
      //     return (
      //       item.comment && item.comment !== undefined && item.comment !== null
      //     );
      //   })
      //   .map((item) => item.comment);

      // var noCmt = sumAr.length - checkCmt.length;

      // var checkAca = dataClose
      //   .filter((item) => {
      //     return item.academic !== undefined && item.academic !== null;
      //   })
      //   .map((item) => {
      //     return item._id;
      //   });
      // console.log(checkAca);

      return res.status(200).render("admin", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        // sumAr: pusharr,
        // tong: tong,
        // Ar: sumUser,
        // sumCmt: checkCmt.length,
        // noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        // dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
  update(req, res, next) {
    const id = req.params.id;
    const { role, facultis, closedate } = req.body;
    var obj = {};
    if (role) {
      obj.role = role;
    }
    if (facultis) {
      obj.facultis = facultis;
    }
    if (closedate) {
      obj.closedate = closedate;
    }

    Users.findOneAndUpdate({ _id: id }, obj)
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send("Error");
      });
  }

  deleteUser(req, res, next) {
    var id = req.params.id;
    Users.deleteOne({ _id: id })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }

  async academic(req, res, next) {
    const { academicStart, academicEnd } = req.body;
    try {
      const academicyears = new AcademicYears({
        academicYears: academicStart,
        End: academicEnd,
      });

      academicyears.save();
      res.redirect("/admin");
    } catch (err) {
      return res.status(500).send("Error");
    }
  }
  updateA(req, res, next) {
    const id = req.params.id;
    const { academicYears, End } = req.body;
    var obj = {};
    if (academicYears) {
      obj.academicYears = academicYears;
    }
    if (End) {
      obj.End = End;
    }

    AcademicYears.findOneAndUpdate({ _id: id }, obj)
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send("Error");
      });
  }

  deleteAcademic(req, res, next) {
    var academicId = req.params.academicId;
    AcademicYears.deleteOne({ _id: academicId })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }
  closeDate(req, res, next) {
    const { closedate, finalclosedate, academic, faculty } = req.body;
    try {
      const closedates = new CloseDates({
        closeDates: closedate,
        finalCloseDates: finalclosedate,
        academic: academic,
        faculty: faculty,
      });
      closedates.save();
      res.redirect("/admin");
    } catch (err) {
      console.error(err);
      return res.status(500).send("err");
    }
  }
  deleteCloseDates(req, res, next) {
    const closeDateId = req.params.id;
    CloseDates.deleteOne({ _id: closeDateId })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }
  closedateUp(req, res, next) {
    const id = req.params.id;
    const { finalCloseDates, closeDates, academic, faculty } = req.body;

    var obj = {};
    if (finalCloseDates) {
      obj.finalCloseDates = finalCloseDates;
    }
    if (closeDates) {
      obj.closeDates = closeDates;
    }
    if (academic) {
      obj.academic = academic;
    }
    if (faculty) {
      obj.faculty = faculty;
    }

    CloseDates.findOneAndUpdate({ _id: id }, obj)
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send("Error");
      });
  }

  facultyC(req, res, next) {
    const nameFaculty = req.body;
    console.log(nameFaculty);
    try {
      const facultis = new Facultis(nameFaculty);
      facultis.save();
      res.status(200).redirect("/admin");
    } catch (err) {
      return res.status(500).send("err");
    }
  }
  updateFa(req, res, next) {
    const id = req.params.id;
    const nameFaculty = req.body.nameFaculty;
    const closedate = req.body.closedate;
    Facultis.findOneAndUpdate(
      { _id: id },
      { nameFaculty: nameFaculty, closeDate: closedate }
    )
      .then(() => {
        res.status(200).send("Done");
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send("Error");
      });
  }
  deleteFa(req, res, next) {
    var id = req.params.id;
    Facultis.deleteOne({ _id: id })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }

  deleteAr(req, res, next) {
    var id = req.params.id;
    Articles.deleteOne({ _id: id })
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => res.status(500).send("Error"));
  }

  async updateAvsFa(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
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
      //***** */ var tong = data.length;
      // var pusharr = [];
      // var facultyCount = {};
      // for (var i = 0; i < sumAr.length; i++) {
      //   var nameFaculty = sumAr[i].faculty.nameFaculty;
      //   if (nameFaculty) {
      //     if (!facultyCount[nameFaculty]) {
      //       facultyCount[nameFaculty] = 1;
      //     } else {
      //       facultyCount[nameFaculty]++;
      //     }
      //   }
      // }
      // for (var faculty in facultyCount) {
      //   pusharr.push({ name: faculty, count: facultyCount[faculty] });
      // }

      // // var checkfa = sumAr.length;
      // // var checkUser = {};
      // // var sumUser = [];
      // // for (var i = 0; i < sumAr.length; i++) {
      // //   var idUser = sumAr[i].users._id;
      // //   if (idUser) {
      // //     if (!checkUser[idUser]) {
      // //       checkUser[idUser] = 1;
      // //     } else {
      // //       checkUser[idUser]++;
      // //     }
      // //   }
      // // }
      // // for (var id in checkUser) {
      // //   sumUser.push({ id: id, count: checkUser[idUser] });
      // // }
      // // console.log(checkUser);

      // // console.log(sumUser);
      // var checkfa = await Articles.aggregate([
      //   {
      //     $group: { _id: "$users", count: { $sum: 1 } },
      //   },
      //   {
      //     $sortByCount: "$_id",
      //   },
      // ]);

      // var sumUser = tong - checkfa.length;

      // var checkCmt = (await Articles.find({}))
      //   .filter((item) => {
      //     return (
      //       item.comment && item.comment !== undefined && item.comment !== null
      //     );
      //   })
      //   .map((item) => item.comment);

      // var noCmt = sumAr.length - checkCmt.length;

      // var checkAca = dataClose
      //   .filter((item) => {
      //     return item.academic !== undefined && item.academic !== null;
      //   })
      //   .map((item) => {
      //     return item._id;
      //   });

      return res.status(200).render("AcademicYearfaculity", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        // sumAr: pusharr,
        // tong: tong,
        // Ar: sumUser,
        // sumCmt: checkCmt.length,
        // noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        // dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }

  async closedate(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
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
      // *****var tong = data.length;
      // var pusharr = [];
      // var facultyCount = {};
      // for (var i = 0; i < sumAr.length; i++) {
      //   var nameFaculty = sumAr[i].faculty.nameFaculty;
      //   if (nameFaculty) {
      //     if (!facultyCount[nameFaculty]) {
      //       facultyCount[nameFaculty] = 1;
      //     } else {
      //       facultyCount[nameFaculty]++;
      //     }
      //   }
      // }
      // for (var faculty in facultyCount) {
      //   pusharr.push({ name: faculty, count: facultyCount[faculty] });
      // }

      // // var checkfa = sumAr.length;
      // // var checkUser = {};
      // // var sumUser = [];
      // // for (var i = 0; i < sumAr.length; i++) {
      // //   var idUser = sumAr[i].users._id;
      // //   if (idUser) {
      // //     if (!checkUser[idUser]) {
      // //       checkUser[idUser] = 1;
      // //     } else {
      // //       checkUser[idUser]++;
      // //     }
      // //   }
      // // }
      // // for (var id in checkUser) {
      // //   sumUser.push({ id: id, count: checkUser[idUser] });
      // // }
      // // console.log(checkUser);

      // // console.log(sumUser);
      // var checkfa = await Articles.aggregate([
      //   {
      //     $group: { _id: "$users", count: { $sum: 1 } },
      //   },
      //   {
      //     $sortByCount: "$_id",
      //   },
      // ]);

      // var sumUser = tong - checkfa.length;

      // var checkCmt = (await Articles.find({}))
      //   .filter((item) => {
      //     return (
      //       item.comment && item.comment !== undefined && item.comment !== null
      //     );
      //   })
      //   .map((item) => item.comment);

      // var noCmt = sumAr.length - checkCmt.length;

      // var checkAca = dataClose
      //   .filter((item) => {
      //     return item.academic !== undefined && item.academic !== null;
      //   })
      //   .map((item) => {
      //     return item._id;
      //   });
      return res.status(200).render("closedate", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        // sumAr: pusharr,
        // tong: tong,
        // Ar: sumUser,
        // sumCmt: checkCmt.length,
        // noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        // dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
  async article(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
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
      // ***var tong = data.length;
      // var pusharr = [];
      // var facultyCount = {};
      // for (var i = 0; i < sumAr.length; i++) {
      //   var nameFaculty = sumAr[i].faculty.nameFaculty;
      //   if (nameFaculty) {
      //     if (!facultyCount[nameFaculty]) {
      //       facultyCount[nameFaculty] = 1;
      //     } else {
      //       facultyCount[nameFaculty]++;
      //     }
      //   }
      // }
      // for (var faculty in facultyCount) {
      //   pusharr.push({ name: faculty, count: facultyCount[faculty] });
      // }

      // // var checkfa = sumAr.length;
      // // var checkUser = {};
      // // var sumUser = [];
      // // for (var i = 0; i < sumAr.length; i++) {
      // //   var idUser = sumAr[i].users._id;
      // //   if (idUser) {
      // //     if (!checkUser[idUser]) {
      // //       checkUser[idUser] = 1;
      // //     } else {
      // //       checkUser[idUser]++;
      // //     }
      // //   }
      // // }
      // // for (var id in checkUser) {
      // //   sumUser.push({ id: id, count: checkUser[idUser] });
      // // }
      // // console.log(checkUser);

      // // console.log(sumUser);
      // var checkfa = await Articles.aggregate([
      //   {
      //     $group: { _id: "$users", count: { $sum: 1 } },
      //   },
      //   {
      //     $sortByCount: "$_id",
      //   },
      // ]);

      // var sumUser = tong - checkfa.length;

      // var checkCmt = (await Articles.find({}))
      //   .filter((item) => {
      //     return (
      //       item.comment && item.comment !== undefined && item.comment !== null
      //     );
      //   })
      //   .map((item) => item.comment);

      // var noCmt = sumAr.length - checkCmt.length;

      // var checkAca = dataClose
      //   .filter((item) => {
      //     return item.academic !== undefined && item.academic !== null;
      //   })
      //   .map((item) => {
      //     return item._id;
      //   });
      return res.status(200).render("articlesadmim", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        // sumAr: pusharr,
        // tong: tong,
        // Ar: sumUser,
        // sumCmt: checkCmt.length,
        // noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
  async statis(req, res, next) {
    try {
      const ad = res.user;
      const dataClose = await CloseDates.find({})
        .populate("academic")
        .populate("faculty");
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

      // var checkfa = sumAr.length;
      // var checkUser = {};
      // var sumUser = [];
      // for (var i = 0; i < sumAr.length; i++) {
      //   var idUser = sumAr[i].users._id;
      //   if (idUser) {
      //     if (!checkUser[idUser]) {
      //       checkUser[idUser] = 1;
      //     } else {
      //       checkUser[idUser]++;
      //     }
      //   }
      // }
      // for (var id in checkUser) {
      //   sumUser.push({ id: id, count: checkUser[idUser] });
      // }
      // console.log(checkUser);

      // console.log(sumUser);
      var checkfa = await Articles.aggregate([
        {
          $group: { _id: "$users", count: { $sum: 1 } },
        },
        {
          $sortByCount: "$_id",
        },
      ]);

      var sumUser = tong - checkfa.length;

      var checkCmt = (await Articles.find({}))
        .filter((item) => {
          return (
            item.comment && item.comment !== undefined && item.comment !== null
          );
        })
        .map((item) => item.comment);

      var noCmt = sumAr.length - checkCmt.length;

      var checkAca = dataClose
        .filter((item) => {
          return item.academic !== undefined && item.academic !== null;
        })
        .map((item) => {
          return item._id;
        });
      return res.status(200).render("statistics", {
        user: true,
        admin: true,
        name: ad.name,
        data: coverData(data),
        nameRole: coverData(role),
        img: ad.img,
        dataClose: coverData(dataClose),
        sumAr: pusharr,
        tong: tong,
        Ar: sumUser,
        sumCmt: checkCmt.length,
        noCmt: noCmt,
        dataAcademicyears: coverData(dataAcademicyears),
        dataFacultis: coverData(dataFacultis),
        dataAr: coverData(sumAr),
        back: "https://png.pngtree.com/background/20210715/original/pngtree-simple-white-textured-crepe-paper-texture-background-picture-image_1296663.jpg",
      });
    } catch (err) {
      return res.send("404 Not Found");
    }
  }
}

module.exports = new AdminController();
