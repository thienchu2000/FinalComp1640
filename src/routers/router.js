const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");
const newsRouter = require("./newsRouter");
const contributionsRouter = require("./contributionsRouter");
const facultysRouter = require("./facultysRouter");
const commentsRouter = require("./commentsRouter");

const {
  isAdmin,
  isStaff,
  isStudent,
  isTeacher,
} = require("../utils/authorize");
// Config đường dẫn khi FE làm xong truyền Function phân quyền vào url trong các router.

function router(app) {
  app.use("/comments", commentsRouter);
  app.use("/facultys", facultysRouter);
  app.use("/contributions", contributionsRouter);
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = router;
