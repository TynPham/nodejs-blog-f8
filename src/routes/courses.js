const express = require("express");
const router = express.Router();

const coursesControllers = require("../app/controllers/CoursesController");

router.get("/:slug", coursesControllers.show);

module.exports = router;
