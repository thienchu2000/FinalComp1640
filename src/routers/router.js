const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");
const newsRouter = require("./newsRouter");

function router(app) {
  app.use("/news", newsRouter);
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = router;
