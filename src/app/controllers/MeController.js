const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, countDeleted]) =>
        res.render("me/stored-courses", {
          countDeleted,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch((error) => {});
  }
  // [GET] /me/trash/courses
  trashCourses(req, res) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch((error) => {});
  }
}

module.exports = new MeController();
