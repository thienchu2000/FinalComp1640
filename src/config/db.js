const mongoose = require("mongoose");
const { env } = require("./environment");

async function connect() {
  mongoose.connect(env.uri, {});

  mongoose.connection
    .once("open", () => {
      console.log("Database connected!");
    })
    .on("error", () => {
      console.log("Database failed !!!");
    });
}

module.exports = { connect };
