const express = require("express");
const router = express.Router();

const newsControllers = require("../app/controllers/NewsController");

router.get("/:slug", newsControllers.show);
router.get("/", newsControllers.index);

module.exports = router;
