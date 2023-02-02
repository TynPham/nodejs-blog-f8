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
  // [GET]/courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch((error) => {});
  }
  // [POST]/course/store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  // [PUT]/course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }
  // [DELETE]/course/:id
  delete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
}

module.exports = new CoursesController();
