module.exports = function(instanceForGreet) {
  async function index(req, res, next) {
    try {
      let counter = await instanceForGreet.count();
      res.render("index", {
        count: counter,
        title: "Greetings",
        dropdown: ["Zulu", "English", "Xhosa", "Afrikaans", "Tsonga"],
        name: instanceForGreet.hello()
      });
    } catch (err) {
      next(err);
    }
  }

  async function addName(req, res) {
    let name = req.body.nameInput;
    let regex = /\d/;
    let test = regex.test(name);
    if (test === true) {
      instanceForGreet.clearGreeting();
      req.flash("info", "Please use letters only!");
    } else {
      if (req.body.language) {
        await instanceForGreet.add(name, req.body.language);
      } else {
        instanceForGreet.clearGreeting();
        req.flash("info", "Please select Language!");
      }
    }
    res.redirect("/");
  }

  async function countFor(req, res) {
    let name = req.params.userName;
    let names = await instanceForGreet.who(req.params.userName);
    let counter = await instanceForGreet.userCount(name);
    res.render("user", {
      isUser: name,
      count: counter
    });
  }

  async function greeted(req, res) {
    let names = await instanceForGreet.names();
    console.log(names);
    res.render("greeted", { allnames: names });
  }

  async function delet(req, res) {
    await instanceForGreet.delete();
    req.flash("reset", "App has been restarted!");
    res.redirect("/");
  }
  return {
    index,
    addName,
    countFor,
    greeted,
    delet
  };
};
