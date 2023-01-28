const Course = require("../models/Course");

class SiteController {
  // [GET] /news
  index(req, res) {
    Course.find({}, (err, courses) => {
      if (!err) {
        res.json(courses);
        return;
      }
      res.status(400).json({ error: "ERROR" });
    });
  }

  // [GET] /news/:slug
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
