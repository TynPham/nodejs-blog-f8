const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(
        (course) =>
          res.render("courses/show", { course: mongooseToObject(course) })
        // res.json(course)
      )
      .catch((error) => next(error));
  }
  // [GET]/courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST]/course/store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
}

module.exports = new CoursesController();
