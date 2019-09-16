const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const moment = require("moment");
moment().format();
// require("bootstrap");
// global.jQuery = require('jquery');
// require("bootstrap-loader");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", {
    title: "Greetings",
    loadTime: (time = moment().format())
  });
});
app.listen(PORT, function() {
  console.log("App started at port:", PORT);
});
