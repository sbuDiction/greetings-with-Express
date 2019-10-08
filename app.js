"use strict";
const express = require("express");
var flash = require("connect-flash");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var toastr = require("express-toastr");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 5000;
const path = require("path");
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://diction:Sbu19970823@localhost:5432/greetings";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const greetings = require("./greet-manager/greet");
const instanceForGreet = greetings();

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);
// app.use(flash());
// app.use(toastr());

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
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index", {
    title: "Greetings",
    dropdown: ["Zulu", "English", "Xhosa", "Afrikaans", "Tsonga"],
    name: instanceForGreet.objectName(),
    counter: instanceForGreet.count()
  });
});
app.post("/greet", function(req, res) {
  instanceForGreet.addName(req.body.nameInput, req.body.language);
  res.redirect("/");
});
app.get("/greeted", function(req, res) {
  res.render("greeted", { allnames: instanceForGreet.names() });
});
app.get("/user/:userName", function(req, res) {
  let name = req.params.userName;
  let names = instanceForGreet.eachUser(req.params.userName);

  res.render("user", {
    isUser: name,
    count: instanceForGreet.countFor(name)
  });
  console.log(instanceForGreet.countFor(req.body.userName));
});

app.listen(PORT, function() {
  console.log("App started at port:", PORT);
});
