const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");
const Articles = require("../models/Articles");
const Facultis = require("../models/Facultis");
const multer = require("multer");
const path = require("path");
const CloseDates = require("../models/CloseDates");

class ArticlesController {
  async index(req, res, next) {
    var users = res.user;
    console.log(users);
    try {
      var checkPrime = await Users.findOne({ _id: users._id }).populate({
        path: "facultis",
        populate: { path: "closeDate", populate: { path: "academic" } },
      });

      var nameF = checkPrime.facultis.nameFaculty;
      var hethan = checkPrime.facultis.closeDate.closeDates;
      var noplai = checkPrime.facultis.closeDate.finalCloseDates;
      var namhoc = checkPrime.facultis.closeDate.academic.academicYears;

      var ketthucnam = checkPrime.facultis.closeDate.academic.End;

      if (checkPrime.facultis === undefined || checkPrime.facultis === null) {
        return res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          a: a,
          nameF: nameF,
          hethan: hethan,
          noplai: noplai,
          namhoc: namhoc,
          ketthucnam: ketthucnam,
          FacultyId: "1",
          AcademicYearsId: "2",
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      } else if (
        (checkPrime.facultis && checkPrime.closedate === undefined) ||
        checkPrime.closedate === null
      ) {
        var uId = checkPrime._id;

        var articles = await Articles.find({}).populate("users");

        var userCheck = articles
          .filter((item) => {
            return item.users._id.equals(uId);
          })
          .map((item) => {
            return item._id;
          });
        var find = await Articles.find({ _id: userCheck });
        var ketqua1 = [];
        var log1 = find.map((item) => {
          console.log(item);
          if (item.status === "true") {
            return ketqua1.push({ sta: "Approved", data: item });
          }
          if (item.status === "false") {
            console.log(item.status === "false");
            return ketqua1.push({ sta: "Reject", data: item });
          }
          if (item.status === "panding") {
            return ketqua1.push({ sta: "Pending", data: item });
          }
        });

        return res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          nameF: nameF,
          hethan: hethan,
          noplai: noplai,
          namhoc: namhoc,
          sta: ketqua1,
          ketthucnam: ketthucnam,
          find: covertData(find),
          FacultyId: checkPrime.facultis._id,
          AcademicYearsId: checkPrime.facultis.closeDate.academic._id,
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      } else if (checkPrime.facultis) {
        var userr = await Users.findOne({ _id: users._id }).populate({
          path: "facultis",
          populate: { path: "closeDate" },
        });

        var uIdd = userr._id;

        var articless = await Articles.find({}).populate("users");
        console.log(articless);

        var userCheckk = articless
          .filter((item) => {
            console.log(item.users._id);
            console.log(item.users._id.equals(uIdd));

            if (item.users._id.equals(uIdd)) {
              return item.users._id.equals(uIdd);
            }
          })
          .map((item) => {
            return item._id;
          });
        // var userCheckk = [];
        // for (var i = 0; i < articless.length; i++) {
        //   console.log(articless[i].users._id);
        //   if (articless[i].users._id.equals(uIdd)) {
        //     console.log(articless[i].users._id.equals(uIdd));
        //     if (
        //       !articless[i].users._id.equals(uIdd) === null &&
        //       !articless[i].users._id.equals(uIdd) === undefined
        //     ) {
        //       console.log(
        //         !articless[i].users._id.equals(uIdd) === undefined &&
        //           !articless[i].users._id.equals(uIdd) === null
        //       );
        //       console.log(articless[i].users._id);
        //       userCheckk.push(articless[i].users._id);
        //     }
        //   }
        // }
        var findd = await Articles.find({ _id: userCheckk });
        var ketqua = [];
        var log = findd.map((item) => {
          if (item.status === "true") {
            return ketqua.push({ sta: "Approved", data: item });
          }
          if (item.status === "false") {
            return ketqua.push({ sta: "Reject", data: item });
          }
        });

        res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          FacultyId: checkPrime.facultis._id,
          nameF: nameF,
          sta: ketqua,
          hethan: hethan,
          noplai: noplai,
          namhoc: namhoc,
          ketthucnam: ketthucnam,
          AcademicYearsId: checkPrime.facultis.closeDate.academic._id,
          find: covertData(findd),
          back: "https://t4.ftcdn.net/jpg/02/67/47/05/360_F_267470534_75jH8bHYJ59Zn4ikrdKDlzSqsjYumTqk.jpg",
        });
      }
    } catch (err) {
      console.log(err);
      return res.send("err");
    }
  }

  async articlesC(req, res, next) {
    const { FacultyId, AcademicYearsId } = req.params;

    if (FacultyId === "1" && AcademicYearsId === "1") {
      return res.status(404).render("error");
    }
    if (FacultyId && AcademicYearsId === "2") {
      return res.status(404).render("error");
    }
    const doc_img = req.files;
    var image = [];
    var doc = [];
    doc_img.forEach(function (data) {
      if (data.filename.match(/\.(jpg|png|jpeg)$/)) {
        return image.push(data.filename);
      } else if (data.filename.match(/\.(msword|doc|pdf)$/)) {
        return doc.push(data.filename);
      }
    });
    const { articlesName, description, condition } = req.body;
    const userId = res.user._id;
    console.log(userId);
    var name = res.user.name;

    try {
      if (!condition && condition === false) {
        return res.status(400).send("must agree to the conditions");
      }
      var newday = new Date();
      var timeday = newday.getTime();
      var close = await Users.findOne({ _id: userId }).populate({
        path: "facultis",
        populate: { path: "closeDate" },
      });
      // console.log(
      //   "dayla",
      //   close.facultis.closeDate.closeDates,
      //   "and",
      //   close.facultis.closeDate.finalCloseDates
      // );

      var dateclose = close.facultis.closeDate.closeDates;
      var finalclose = close.facultis.closeDate.finalCloseDates;

      var finalcloseTime;
      if (finalclose) {
        finalcloseTime = finalclose.getTime();
      } else {
        finalcloseTime = null;
      }
      // console.log(finalclose);
      var datecloseTime;
      if (dateclose) {
        datecloseTime = dateclose.getTime();
      } else {
        datecloseTime = null;
      }

      var count;
      if (finalcloseTime === null || finalcloseTime === undefined) {
        count = (timeday - datecloseTime) / (3600 * 1000 * 24);
      } else {
        count = (timeday - finalcloseTime) / (3600 * 1000 * 24);
      }

      if (count >= 0) {
        return res.status(400).send("Invalid");
      }
      const articles = new Articles({
        img: image,
        doc: doc,
        articlesName: articlesName,
        description: description,
        users: userId,
        faculty: FacultyId,
        academicYears: AcademicYearsId,
      });

      articles.save();
      var faculityId = await Facultis.findOne({ _id: FacultyId }).then(
        (item) => item._id
      );
      var nameF = await Facultis.findOne({ _id: FacultyId }).then(
        (item) => item.nameFaculty
      );

      var query = await Users.find({}).populate("facultis").populate("role");
      var checkUder = query.filter((item) => {
        return (
          item.facultis !== undefined &&
          item.facultis !== null &&
          item.facultis.nameFaculty !== undefined &&
          item.facultis.nameFaculty !== null
        );
      });
      var checkEmail = checkUder
        .filter((item) => {
          return (
            item.role.name === "Marketing Coordinator" &&
            item.facultis._id.equals(faculityId)
          );
        })
        .map((item) => {
          return item.email;
        });

      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject.token;
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: env.ADMIN_EMAIL_ADDRESS,
          clientId: env.GOOGLE_MAILER_CLIENT_ID,
          clientSecret: env.GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: env.GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      const mailOptions = {
        to: checkEmail.join(","),
        subject: `Student submission`,
        html: `<h3>${name} Submission at ${nameF} </h3>`,
      };
      await transport.sendMail(mailOptions);
      res.status(200).redirect("/articles");
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
  upArticle(req, res, next) {
    const _id = req.params._id;

    const doc_img = req.files;

    var image = [];
    var doc = [];
    doc_img.forEach(function (data) {
      if (data.filename.match(/\.(jpg|png|jpeg)$/)) {
        return image.push(data.filename);
      } else if (data.filename.match(/\.(msword|doc|pdf|docx)$/)) {
        return doc.push(data.filename);
      }
    });

    const { articlesname, description } = req.body;

    var obj = {};
    if (image) {
      obj.img = image;
    }
    if (doc) {
      obj.doc = doc;
    }
    if (articlesname) {
      obj.articlesName = articlesname;
    }
    if (description) {
      obj.description = description;
    }
    Articles.findOneAndUpdate({ _id: _id }, obj)
      .then(() => {
        res.status(200).redirect("/articles");
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send("Error");
      });
  }
}

module.exports = new ArticlesController();
