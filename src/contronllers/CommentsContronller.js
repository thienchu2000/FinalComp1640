const Comments = require("../models/Comments");

class CommentsController {
  index(res, req, next) {
    res.send("Welcome");
  }
}

module.exports = new CommentsController();
