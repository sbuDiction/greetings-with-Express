const GreetingsRoute = () => {
  const renderIndex = () => {
    app.get("/", function(req, res) {
      res.render("index", {
        title: "Greetings",
        dropdown: ["Zulu", "English", "Xhosa", "Afrikaans", "Tsonga"],
        name: instanceForGreet.objectName(),
        counter: instanceForGreet.count()
      });
    });
  };

  return {
    renderIndex
  };
};

// app.post("/greet", function(req, res) {
//   instanceForGreet.greet(req.body.nameInput, req.body.language);
//   res.redirect("/");
// });
// app.get("/greeted", function(req, res) {
//   res.render("greeted", { allnames: instanceForGreet.names() });
// });
// app.get("/user/:userName", function(req, res) {
//   let name = req.params.userName;
//   let names = instanceForGreet.eachUser(req.params.userName);

//   res.render("user", {
//     isUser: name,
//     count: instanceForGreet.countFor(name)
//   });
//   console.log(instanceForGreet.countFor(req.body.userName));
// });
