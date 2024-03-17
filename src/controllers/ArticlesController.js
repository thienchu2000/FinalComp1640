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
    try {
      var users = res.user;
      var user = await Users.findOne({ _id: users._id }).populate({
        path: "closedate",
        populate: { path: "academic", model: "AcademicYears" },
      });
      var uId = user._id;

      var articles = await Articles.find({}).populate("users");

      var userCheck = articles
        .filter((item) => {
          return item.users._id.equals(uId);
        })
        .map((item) => {
          return item._id;
        });
      var find = await Articles.find({ _id: userCheck });
      res.render("articles", {
        user: true,
        student: true,
        name: users.name,
        role: users.role,
        img: users.img,
        FacultyId: user.facultis,
        AcademicYearsId: user.closedate.academic._id,
        find: covertData(find),
      });
    } catch (err) {
      console.log(err);
      return res.send("err");
    }
  }

  async articlesC(req, res, next) {
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
    const { FacultyId, AcademicYearsId } = req.params;
    try {
      if (!condition && condition === false) {
        return res.status(400).send("must agree to the conditions");
      }
      var newday = new Date();
      var timeday = newday.getTime();
      var close = await Users.findOne({ _id: userId }).populate("closedate");

      var dateclose = close.closedate.closeDates;
      var finalclose = close.closedate.finalCloseDates;

      var datecloseTime = dateclose.getTime();
      var finalcloseTime = finalclose.getTime();
      var checkclose = (timeday - datecloseTime) / (3600 * 1000 * 24);
      var checkfinal = (timeday - finalcloseTime) / (3600 * 1000 * 24);

      var x = checkfinal > 0 ? checkfinal : checkclose;

      if (x > 0) {
        return res.status(400).send("expired");
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
      var namefaculity = await Facultis.findOne({ _id: FacultyId }).then(
        (item) => item.nameFaculty
      );

      var query = (await Users.find({}).populate("role").populate("facultis"))
        .filter((data) => {
          return (
            data.role.name === "Marketing Coordinator" &&
            data.facultis.nameFaculty === namefaculity
          );
        })
        .map((data) => data.email);

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
        to: query.join(","),
        subject: `Student submission`,
        html: `<h3>${name} Submission at ${namefaculity} </h3>`,
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
