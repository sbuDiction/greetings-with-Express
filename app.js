const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 5000;
const pug = require("pug");
const path = require("path");

const moment = require("moment");
const greetings = require("./greet");
const instanceForGreet = greetings();
moment().format();
// require("bootstrap");
// global.jQuery = require('jquery');
// require("bootstrap-loader");
app.use(express.static("public"));
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts"
  // helpers
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index", {
    title: "Greetings",
    dropdown: ["Zulu", "English", "Xhosa", "Afrikaans", "Tsonga"],
    name: instanceForGreet.getEngLanguage(),
    counter: instanceForGreet.count()
  });
  console.log(instanceForGreet.getEngLanguage());
  console.log(instanceForGreet.objectName());
});

app.post("/greet", function(req, res) {
  instanceForGreet.greet(req.body.nameInput, req.body.language);

  res.redirect("/");
});

app.get("/greeted", function(req, res) {
  var renderEachName = instanceForGreet.getAllNames();
  for (const iterator of renderEachName) {
    iterator.name = iterator.user;
  }

  res.render("greeted", { allnames: renderEachName });
});

app.get("/user/:userName", function(req, res) {
  const nameSelected = req.body.userName;
  let renderName = instanceForGreet.eachUser(nameSelected);
  for (const iterator of renderName) {
    iterator.name = iterator.user;
  }

  res.render("user", { isUser: req.params.userName });
});

app.listen(PORT, function() {
  console.log("App started at port:", PORT);
});
