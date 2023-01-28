class SiteController {
  // [GET] /news
  index(req, res) {
    res.render("home");
  }

  // [GET] /news/:slug
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
