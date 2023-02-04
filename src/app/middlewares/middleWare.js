module.exports = function middleWare(req, res, next) {
  res.locals._sort = {
    enables: false,
    type: "default",
  };

  if (req.query.hasOwnProperty("_sort")) {
    Object.assign(res.locals._sort, {
      enables: true,
      type: req.query.type,
      column: req.query.column,
    });
  }

  next();
};
