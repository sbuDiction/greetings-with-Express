module.exports = function Greetings(pool) {
  let toCase = "";
  let languageType = "";

  async function addName(name, language) {
    toCase = name[0].toUpperCase() + name.slice(1);
    let regex = /\d/;
    let number = regex.test(toCase);
    if (number === false) {
      let data = await pool.query(
        "SELECT * FROM greetings WHERE userName = $1;",
        [toCase]
      );
      if (data.rowCount > 0) {
        for (let x = 0; x < data.rows.length; x++) {
          let username = data.rows[x].username;
          if (username === toCase) {
            data.rows[0].countTime;
            const results = await pool.query(
              "SELECT * FROM greetings WHERE userName = $1",
              [toCase]
            );
            if (results.rowCount > 0) {
              const count = await pool.query(
                "SELECT countTime FROM greetings WHERE userName = $1",
                [toCase]
              );
              let newCount = count.rows[0].counttime;
              newCount++;
              await pool.query(
                "UPDATE greetings SET countTime = $1 WHERE userName = $2",
                [newCount, toCase]
              );
            }
          }
        }
      } else {
        await pool.query(
          "INSERT INTO greetings (userName,countTime) VALUES ($1,$2);",
          [toCase, 1]
        );
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
  }

  async function all() {
    let names = await pool.query("SELECT * FROM greetings;");
    return names.rows;
  }

  const greet = () => {
    return toCase;
  };

  async function keepCount() {
    let counter = await pool.query("SELECT COUNT(*) FROM greetings;");
    return counter.rows;
  }

  async function countFor(name) {
    let nameList = await pool.query("SELECT * FROM greetings;");
    let counted = 0;
    for (let x = 0; x < nameList.rows.length; x++) {
      let counter = nameList.rows[x].username;
      if (name === counter) {
        console.log(counter, "step 1");

        counted = nameList.rows[x].counttime;
      }
      console.log(counter, "step 2");
      console.log(name, "step 3");
    }
    return counted;
  }
  // console.log(nameStorage);

  // const getAllNames = () => {
  //   return nameStorage;
  // };

  // const names = () => {
  //   return nameList;
  // };

  // function getName() {
  //   return toCase;
  // }

  async function eachUser(username) {
    let nameList = await pool.query("SELECT * FROM greetings;");
    return nameList.filter(list => list.rows.username === username);
  }

  async function clearData() {
    let clear = await pool.query("DELETE * FROM greetings;");
    return clear.rows;
  }

  return {
    add: addName,
    names: all,
    hello: greet,
    count: keepCount,
    userCount: countFor,
    who: eachUser,
    delete: clearData
  };
};
