module.exports = function() {
  let nameStorage = {};
  let nameList = [];
  let toCase = "";
  let languageType = "";

  const greetMe = (name, language) => {
    toCase = name[0].toUpperCase() + name.slice(1);
    let regex = /\d/;
    var number = regex.test(toCase);
    if (number === false) {
      if (nameStorage[toCase] === undefined) {
        nameStorage[toCase] = 0;
        nameList.push({ name: toCase, count: 1 });
      } else {
        for (let x = 0; x < nameList.length; x++) {
          if (toCase === nameList[x].name) {
            nameList[x].count++;
          }
        }
      }
    }
    if (language == "English") {
      languageType = "Hello, ";
    } else if (language == "Zulu") {
      languageType = "Sawubona, ";
    } else if (language == "Afrikaans") {
      languageType = "Hallo, ";
    } else if (language == "Tsonga") {
      languageType = "Avuxeni, ";
    } else if (language == "Xhosa") {
      languageType = "Molo, ";
    }
    toCase = languageType + toCase;
  };

  console.log(nameStorage);

  const getAllNames = () => {
    return nameStorage;
  };

  const count = () => {
    let counter = Object.keys(nameStorage);
    return counter.length;
  };

  const names = () => {
    return nameList;
  };

  const countFor = name => {
    let counted = 0;
    for (let x = 0; x < nameList.length; x++) {
      if (name === nameList[x].name) {
        counted = nameList[x].count;
      }
    }
    return counted;
  };

  function getName() {
    return toCase;
  }

  const eachUser = name => {
    return nameList.filter(list => list.name === name);
  };

  return {
    greet: greetMe,
    objectName: getName,
    getAllNames,
    eachUser,
    names,
    count,
    countFor
  };
};
