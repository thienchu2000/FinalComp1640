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
    try {
      var checkPrime = await Users.findOne({ _id: users._id }).populate({
        path: "facultis",
        populate: { path: "closeDate" },
      });
      if (checkPrime.facultis === undefined || checkPrime.facultis === null) {
        return res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          a: a,
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
        return res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          find: covertData(find),
          FacultyId: checkPrime.facultis._id,
          AcademicYearsId: checkPrime.facultis.closeDate.academic,
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
            return item.users._id.equals(uIdd);
          })
          .map((item) => {
            return item._id;
          });
        console.log(userCheckk);
        var findd = await Articles.find({ _id: userCheckk });
        console.log(findd);
        res.render("articles", {
          user: true,
          student: true,
          name: users.name,
          role: users.role,
          img: users.img,
          FacultyId: checkPrime.facultis._id,
          AcademicYearsId: checkPrime.facultis.closeDate.academic,
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
}

module.exports = new ArticlesController();
