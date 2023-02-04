const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const methodOverride = require("method-override");
const middleWare = require("./app/middlewares/middleWare");
const route = require("./routes");
const port = 3000;

const db = require("./config/db");
// connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// custom middleware
app.use(middleWare);

// HTTP Logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        let sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          desc: "oi oi-sort-descending",
          asc: "oi oi-sort-ascending",
        };
        const types = {
          default: "desc",
          desc: "asc",
          asc: "desc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><span
        class="${icon}"
      ></span></a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
