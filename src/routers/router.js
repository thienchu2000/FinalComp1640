const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");
const newsRouter = require("./newsRouter");
const {
  isAdmin,
  isStaff,
  isStudent,
  isTeacher,
} = require("../utils/authorize");

function router(app) {
  app.use("/news", newsRouter);
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = router;
