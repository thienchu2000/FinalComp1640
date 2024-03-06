const News = require("../models/News");
const { env } = require("../config/environment");
const covertData = require("../utils/coverData");
const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { myOAuth2Client } = require("../config/email");

class NewsController {
  index(req, res, next) {
    res.send("Hello");
  }

  // CRUD -- News.
  createNews(req, res, next) {
    const { users, title, contens, img, address, phone } = req.body;
    const news = new News({
      users,
      title,
      contens,
      img,
      address,
      phone,
    });
    news.save();
    res.send("Done");
  }

  async readNews(req, res, next) {
    const data = await News.find({})
      .then((data) => {
        res.status(200).send(covertData(data));
      })
      .catch((err) => {
        return res.status.send("err db");
      });
  }

  upDateNews(req, res, next) {
    const { upDateId } = req.params.upDateId;
    News.updateOne({ upDateId })
      .then((data) => {
        res.status(200).send(covertData(data));
      })
      .catch((err) => {
        return res.send("err db");
      });
  }

  deleteNews(req, res, next) {
    const { deleteId } = req.params.deleteId;
    News.deleteOne({ deleteId })
      .then((data) => {
        res.status(200).send(covertData(data));
      })
      .catch((err) => {
        return res.send("err");
      });
  }

  // cộng tác sinh viên gửi egmail thông báo EX: đóng học phí.
  async StaffsendEmail(req, res, next) {
    const { subject, contents } = req.body;
    try {
      const findEmail = await Users.find({}).populate({
        path: "role",
      });
      // console.log(findEmail);
      var arrayPush = [];
      for (var i = 0; i < findEmail.length; i++) {
        if (findEmail[i].role.name === "Student") {
          arrayPush.push(findEmail[i]);
        }
      }

      var maparray = arrayPush.map((item) => item.email);
      // console.log(maparray);

      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject?.token;
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
        to: maparray.join(" ,"),
        subject: `${subject}`,
        html: `<h3>${contents}</h3>`,
      };
      await transport.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully." });
    } catch (err) {
      console.error(err);
      return res.send("err");
    }
  }
}

module.exports = new NewsController();
