module.exports = function() {
  // var nameStorage = {};
  let languageList = [];
  let str = "";
  let nameList = [];
  let userCounter = 0;
  console.log(nameList);
  console.log(userCounter);

  const greetMe = (name, language) => {
    // let count = 0;
    console.log(name);
    
    let toCase = name[0].toUpperCase() + name.slice(1);
    if (language == "English") {
      languageList.push({
        languageType: "Hello, ",
        user: toCase
      });
    } else if (language == "Zulu") {
      languageList.push({
        languageType: "Sawubona, ",
        user: toCase,
      });
    } else if (language == "Afrikaans") {
      languageList.push({
        languageType: "Hallo, ",
        user: toCase
      });
    } else if (language == "Tsonga") {
      languageList.push({
        languageType: "Avuxeni, ",
        user: toCase
      });
    } else if (language == "Xhosa") {
      languageList.push({
        languageType: "Molo, ",
        user: toCase
      });
    }
    for (let x = 0; x < nameList.length; x++) {
      if (nameList[x].name === toCase) {
        nameList[x].count++;
        // console.log(nameList[x].count);

        nameList.push({
          name:
            toCase[
              {
                count: userCounter
              }
            ]
        });
      }
    }
  };

  const getEngLanguage = () => {
    for (let x = 0; x < languageList.length; x++) {
      const element = languageList[x].languageType + languageList[x].user;
      str = element;
    }
    return str;
  };
  const getAllNames = () => {
    return languageList;
  };

  function keepCount() {
    for (let x = 0; x < languageList.length; x++) {
      const element = languageList[x].user;
      return languageList.length;
    }
  }

  function getName() {
    return nameList;
  }
  const eachUser = user => {
    return languageList.filter(list => list.user === user);
  };

  return {
    greet: greetMe,
    count: keepCount,
    objectName: getName,
    getEngLanguage,
    getAllNames,
    eachUser
  };
};
