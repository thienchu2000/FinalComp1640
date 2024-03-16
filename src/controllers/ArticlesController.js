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
  index(req, res, next) {
    var users = res.user;
    res.render("test");
  }

  // CRUD---articles

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
    // const userId = res.user._id;
    const { facultyId, AcademicYearsId, userId } = req.params;
    try {
      if (!condition && condition === false) {
        return res.status(400).send("must agree to the conditions");
      }
      var newday = new Date();
      var timeday = newday.getTime();
      var close = await Users.findOne({ _id: userId }).populate("closedate");
      var name = close.name;
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
        faculty: facultyId,
        academicYears: AcademicYearsId,
      });

      articles.save();
      var namefaculity = await Facultis.findOne({ _id: facultyId }).then(
        (item) => item.nameFaculty
      );

      var query = (await Users.find({}).populate("role").populate("facultis"))
        .filter((data) => {
          return (
            data.role.name === "Maketing Coordinator" &&
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
        subject: `student ${name} submission`,
        html: `<h3>Submission</h3>`,
      };
      await transport.sendMail(mailOptions);
      res.status(200).send("Success Submissions");
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  async comemt(req, res, next) {
    const { articlesId } = req.params;
    const { comment } = req.body;
    var checkIdStudent = await Articles.findOne({ _id: articlesId });
    var nameStudent = checkIdStudent.name;
    var dateSubmission = checkIdStudent.createdAt;
    var newdate = new Date();
    var newdateTime = newdate.getTime();
    var timeSubmission = dateSubmission.getTime();
    var coverData = newdateTime - timeSubmission / (3600 * 1000 * 24);
    if (coverData > 14) {
      return res.status(400).send("Out of date");
    }
    Articles.findOneAndUpdate({ _id: articlesId }, { comment: comment }).then(
      () => {
        res.status(200).send("Done");
      }
    );
  }
}

module.exports = new ArticlesController();
