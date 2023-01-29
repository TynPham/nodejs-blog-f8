const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /news
  index(req, res, next) {
    // Course.find({}, (err, courses) => {
    //   if (!err) {
    //     res.json(courses);
    //   } else {
    //     next(err);
    //   }
    // });
    Course.find()
      .then((courses) =>
        res.render("home", { courses: multipleMongooseToObject(courses) })
      )
      .catch((error) => next(error));
  }

  // [GET] /news/:slug
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
