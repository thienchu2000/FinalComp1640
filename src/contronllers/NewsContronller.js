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

  // RCUD -- News.
  async readNews(req, res, next) {
    try {
      const data = await News.find({});

      return res.send(covertData(data));
    } catch (err) {
      res.send("err");
    }
  }

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

  upDateNews(req, res, next) {
    const { upDateId } = req.params.upDateId;
    News.updateOne({ upDateId })
      .then(() => {
        return res.send("Done");
      })
      .catch((err) => {
        return res.send("err");
      });
  }

  deleteNews(req, res, next) {
    const { deleteId } = req.params.deleteId;
    News.deleteOne({ deleteId })
      .then(() => {
        return res.send("Done");
      })
      .catch((err) => {
        return res.send("err");
      });
  }

  // cộng tác sinh viên gửi egmail thông báo EX: đóng học phí.
  async StaffsendEmail(req, res, next) {
    const { subject, contents } = req.body;
    try {
      const findEmail = await Users.findOne({});
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
        to: findEmail.email,
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
