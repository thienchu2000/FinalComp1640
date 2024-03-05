const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");
const newsRouter = require("./newsRouter");
const assignmentsRouter = require("./assignmentsRouter");
const subjectsRouter = require("./subjectsRouter");
const feedbackRouter = require("./feedbackRouter");

const {
  isAdmin,
  isStaff,
  isStudent,
  isTeacher,
} = require("../utils/authorize");
// Config đường dẫn khi FE làm xong truyền Function phân quyền vào url trong các router.

function router(app) {
  app.use("/feedback", feedbackRouter);
  app.use("/subjects", subjectsRouter);
  app.use("/assignments", assignmentsRouter);
  app.use("/news", newsRouter);
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = router;
