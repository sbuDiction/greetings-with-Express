module.exports = function Greetings(pool) {
  let greeting = "";
  let languageType = "";

  async function getByName(name) {
    let myQuery = "SELECT * FROM greetings WHERE username = '${name}'";
    let results = await pool.query(myQuery);
    return results.rows[0];
  }

  async function add(name, language) {
    let userName = name[0].toUpperCase() + name.slice(1);
    let regex = /\d/;
    let number = regex.test(userName);

    if (number === false) {
      let data = getByName(userName);
      if (data.rowCount > 0) {
        for (let x = 0; x < data.rows.length; x++) {
          let username = data.rows[x].username;
          if (username === userName) {
            data.rows[0].countTime;
            const results = getByName(userName);
            if (results.rowCount > 0) {
              const count = getByName(userName);
              let newCount = count.rows[0].counttime;
              newCount++;
              await pool.query(
                "UPDATE greetings SET countTime = $1 WHERE userName = $2",
                [newCount, userName]
              );
            }
          }
        }
      } else {
        await pool.query(
          "INSERT INTO greetings (userName,countTime) VALUES ($1,$2);",
          [userName, 1]
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
    greeting = languageType + userName;
  }

  const clearGreeting = () => {
    greeting = "";
  };

  async function all() {
    let names = await pool.query("SELECT * FROM greetings;");
    return names.rows;
  }

  const greet = () => {
    return greeting;
  };

  async function keepCount() {
    let counter = await pool.query("SELECT COUNT(*) FROM greetings;");
    let count = counter.rows[0].count;
    return count;
  }

  async function countFor(name) {
    let nameList = await all();
    let counted = 0;
    for (let x = 0; x < nameList.length; x++) {
      let counter = nameList[x].username;
      if (name === counter) {
        let newNum = nameList[x].counttime;
        counted = newNum;
      }
    }
    return counted;
  }

  async function eachUser(username) {
    let nameList = await all();
    let newArray = nameList;
    return newArray.filter(list => list === username);
  }

  async function clearData() {
    let clear = await pool.query("DELETE FROM greetings;");
    clearGreeting();
    return clear.rows;
  }

  return {
    add,
    clearGreeting,
    names: all,
    hello: greet,
    count: keepCount,
    userCount: countFor,
    who: eachUser,
    delete: clearData,
    getByName
  };
};
