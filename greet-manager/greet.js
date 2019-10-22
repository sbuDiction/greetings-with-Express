module.exports = function Greetings (pool) {
    let greeting = '';
    let languageType = '';

    async function add (name, language) {
        const userName = name.toUpperCase();
        const regex = /\d/;
        const number = regex.test(userName);
        if (number === false) {
            const data = await pool.query(
                'SELECT * FROM greetings WHERE userName = $1;',
                [userName]
            );
            if (data.rowCount > 0) {
                for (let x = 0; x < data.rows.length; x++) {
                    const username = data.rows[x].username;
                    if (username === userName) {
                        // var x = data.rows[0].countTime;
                        const results = await data;
                        if (results.rowCount > 0) {
                            const count = await pool.query(
                                'SELECT countTime FROM greetings WHERE userName = $1',
                                [userName]
                            );
                            let newCount = count.rows[0].counttime;
                            newCount++;
                            await pool.query(
                                'UPDATE greetings SET countTime = $1 WHERE userName = $2',
                                [newCount, userName]
                            );
                        }
                    }
                }
            } else {
                await pool.query(
                    'INSERT INTO greetings (userName,countTime) VALUES ($1,$2);',
                    [userName, 1]
                );
            }
        }
        if (language === 'English') {
            languageType = 'Hello, ';
        } else if (language === 'Zulu') {
            languageType = 'Sawubona, ';
        } else if (language === 'Afrikaans') {
            languageType = 'Hallo, ';
        } else if (language === 'Tsonga') {
            languageType = 'Avuxeni, ';
        } else if (language === 'Xhosa') {
            languageType = 'Molo, ';
        }
        greeting = languageType + userName;
    }

    const clearGreeting = () => {
        greeting = '';
    };

    async function all () {
        const names = await pool.query('SELECT * FROM greetings;');
        return names.rows;
    }

    const greet = () => {
        return greeting;
    };

    async function keepCount () {
        const counter = await pool.query('SELECT COUNT(*) FROM greetings;');
        const count = counter.rows[0].count;
        return count;
    }

    async function countFor (name) {
        const nameList = await all();
        let counted = 0;
        for (let x = 0; x < nameList.length; x++) {
            const counter = nameList[x].username;
            if (name === counter) {
                const newNum = nameList[x].counttime;
                counted = newNum;
            }
        }
        return counted;
    }

    async function eachUser (username) {
        const nameList = await all();
        const newArray = nameList;
        return newArray.filter(list => list === username);
    }

    async function clearData () {
        const clear = await pool.query('DELETE FROM greetings;');
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
        delete: clearData
    };
};
