const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const nodemailer = require("nodemailer");
const { env } = require("./environment");

const OAuth2Client = google.auth.OAuth2;
const myOAuth2Client = new OAuth2Client(
  env.GOOGLE_MAILER_CLIENT_ID,
  env.GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: env.GOOGLE_MAILER_REFRESH_TOKEN,
});

module.exports = {
  myOAuth2Client: myOAuth2Client,
  GOOGLE_MAILER_REFRESH_TOKEN: env.GOOGLE_MAILER_REFRESH_TOKEN,
  ADMIN_EMAIL_ADDRESS: env.ADMIN_EMAIL_ADDRESS,
  GOOGLE_MAILER_CLIENT_ID: env.GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET: env.GOOGLE_MAILER_CLIENT_SECRET,
};
