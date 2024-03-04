const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");

function router(app) {
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = router;
