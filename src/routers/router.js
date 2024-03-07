const homeRouter = require("./homeRouter");
const usersRouter = require("./usersRouter");
const newsRouter = require("./newsRouter");
const articlesRouter = require("./articlesRouter");
const facultisRouter = require("./facultisRouter");
const statusRouter = require("./statusRouter");
const academicYearsRouter = require("./academicYearsRouter");
const closeDatesRouter = require("./closeDatesRouter");

const {
  isAdmin,
  isMaketing_manager,
  isMaketing_Coordinator,
  isStudent,
  isGuest,
} = require("../utils/authorize");
// Config đường dẫn khi FE làm xong truyền Function phân quyền vào url trong các router.

function router(app) {
  app.use("/closeDates", closeDatesRouter);
  app.use("/academicYears", academicYearsRouter);
  app.use("/status", statusRouter);
  app.use("/facultis", facultisRouter);
  app.use("/articles", articlesRouter);
  app.use("/users", usersRouter);
  app.use("/", homeRouter);
}

module.exports = router;
