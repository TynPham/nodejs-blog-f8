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
      .then(() => res.redirect("/me/stored/courses"))
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
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
  // [DELETE]/course/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
  // [PATCH]/course/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
  // [POST]/course/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch((error) => {});
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }
}

module.exports = new CoursesController();
