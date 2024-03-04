const homeRouter = require("./homeRouter");
const uesrsRouter = require("./uesrsRouter");

function route(app) {
  app.use("/uesrs", uesrsRouter);
  app.use("/", homeRouter);
}

module.exports = route;
