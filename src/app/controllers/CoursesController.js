const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  // [GET] /news/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(
        (course) =>
          res.render("courses/show", { course: mongooseToObject(course) })
        // res.json(course)
      )
      .catch((error) => next(error));
  }
}

module.exports = new CoursesController();
