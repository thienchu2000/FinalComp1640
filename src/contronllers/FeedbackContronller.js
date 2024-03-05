const Feedback = require("../models/Feedback");

class FeedbackController {
  index(res, req, next) {
    res.send("Welcome");
  }
}

module.exports = new FeedbackController();
