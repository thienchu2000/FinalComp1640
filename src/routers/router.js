const homeRouter = require("./homeRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const adminRouter = require("./adminRouter");
const coordinatorRouter = require("./coordinatorRouter");
const checkLogin = require("../utils/checkLogin");
const authentication = require("../utils/authentication");

// Config đường dẫn khi FE làm xong truyền Function phân quyền vào url trong các router.

function router(app) {
  app.use("/coordinator", coordinatorRouter);
  app.use("/articles", articlesRouter);
  app.use("/admin", checkLogin, adminRouter);
  app.use("/users", usersRouter);
  app.use("/", authentication, homeRouter);
}

module.exports = router;
