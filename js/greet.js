var Greetings = function(names) {
  var nameStorage = names || {};

  function greetMe(userName, language) {
      console.log(userName);
      
    let regex = /\d/;
    var upperCaseLetters = userName.toUpperCase();
    var number = regex.test(upperCaseLetters);
    if (!userName) {
      return "Please input name and select language!";
    } else if (!language) {
      return "Please select language!";
    }

    if (number === false) {
      if (nameStorage[upperCaseLetters] === undefined) {
        nameStorage[upperCaseLetters] = 0;
      }
    }

    if (language === "English" && allLetter(upperCaseLetters) === true) {
      return "Hello, " + upperCaseLetters;
    } else if (
      language === "Afrikaans" &&
      allLetter(upperCaseLetters) === true
    ) {
      return "Hallo, " + upperCaseLetters;
    }
    if (language === "Zulu" && allLetter(upperCaseLetters) === true) {
      return "Sawubona, " + upperCaseLetters;
    } else {
      return "Please use letters only! ";
    }
  }

  function keepCount() {
    var countName = Object.keys(nameStorage);
    console.log(countName.length);
    return countName.length;
  }

  function getName() {
    return nameStorage;
  }

  function clear() {
    nameStorage = {};
  }

  function allLetter(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.match(letters)) {
      return true;
    } else {
      alert("invalid charecters entered!");
      return false;
    }
  }
  return {
    greet: greetMe,
    count: keepCount,
    objectName: getName,
    remove: clear,
    onlyLetters: allLetter
  };
};
