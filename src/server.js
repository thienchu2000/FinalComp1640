const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const db = require("./config/db");
const router = require("./routers/router");
const app = express();
const path = require("path");
const session = require("express-session");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { create } = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const { env } = require("./config/environment");

const exphbs = create({
  extname: ".hbs",
});
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "chuNe",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.engine("hbs", exphbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

router(app);

app.listen(3000, async () => {
  await db.connect("database connection");
  console.log(`run server http://localhost:3000`);
});
