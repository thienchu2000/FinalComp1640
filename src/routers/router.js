const homeRouter = require("./homeRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const adminRouter = require("./adminRouter");
const checkLogin = require("../utils/checkLogin");
const authentication = require("../utils/authentication");

const {
  isAdmin,
  isMaketing_manager,
  isMaketing_Coordinator,
  isStudent,
  isGuest,
} = require("../utils/authorize");
// Config đường dẫn khi FE làm xong truyền Function phân quyền vào url trong các router.

function router(app) {
  app.use("/articles", articlesRouter);
  app.use("/admin", checkLogin, adminRouter);
  app.use("/users", usersRouter);
  app.use("/", authentication, homeRouter);
}

module.exports = router;
