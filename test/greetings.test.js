/* eslint-disable no-undef */
const assert = require('assert');
const Greetings = require('../greet-manager/greet');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://diction:19970823@localhost:5432/greetings_tests';

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('Greet testing', function () {
    beforeEach(async function () {
        await pool.query('DELETE FROM greetings;');
    });

    it('Should able to add a name to database  ', async function () {
        const instanceOfGreet = Greetings(pool);
        await instanceOfGreet.add('diction');
        const userName = await instanceOfGreet.names();
        assert.strict.equal(1, userName.length);
    });

    it("Should able to add multple name's to the database  ", async function () {
        const instanceOfGreet = Greetings(pool);
        await instanceOfGreet.add('diction');
        await instanceOfGreet.add('sbu');
        await instanceOfGreet.add('victor');
        await instanceOfGreet.add('axola');
        const userName = await instanceOfGreet.names();
        assert.strict.equal(4, userName.length);
    });

    describe('Invalid input Testing', function () {
        it('Should not add an invalid name to the database if it contains numbers  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu2134');
            const userName = await instanceOfGreet.names();
            assert.strict.equal(0, userName.length);
        });
    });
    describe('Greet message Testing', function () {
        it('Should be able to greet a user in if the the language selected is Zulu  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'Zulu');
            const message = await instanceOfGreet.hello();
            assert.strict.equal(message, 'Sawubona, SBU');
        });
        it('Should be able to greet a user in if the the language selected is English  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'English');
            const message = await instanceOfGreet.hello();
            assert.strict.equal(message, 'Hello, SBU');
        });
        it('Should be able to greet a user in if the the language selected is Afrikaans  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'Afrikaans');
            const message = await instanceOfGreet.hello();
            assert.strict.equal(message, 'Hallo, SBU');
        });
        it('Should be able to greet a user in if the the language selected is Tsonga  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'English');
            const message = await instanceOfGreet.hello();
            assert.strict.equal(message, 'Hello, SBU');
        });
        it('Should be able to greet a user in if the the language selected is Xhosa  ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'Xhosa');
            const message = await instanceOfGreet.hello();
            assert.strict.equal(message, 'Molo, SBU');
        });
    });
    describe('Greet counter Testing', function () {
        it('Should be able to show how many users have been greeted in the app ', async function () {
            const instanceOfGreet = Greetings(pool);
            await instanceOfGreet.add('sbu', 'Zulu');
            await instanceOfGreet.add('diction', 'Zulu');
            const counter = await instanceOfGreet.count();
            assert.strict.deepEqual(counter, '2');
        });

        describe('User counter Testing', function () {
            it('Should be able to show the counter for each user that how many times there were greeted ', async function () {
                const instanceOfGreet = Greetings(pool);
                await instanceOfGreet.add('sbu', 'Zulu');
                await instanceOfGreet.add('sbu', 'Zulu');
                const counter = await instanceOfGreet.userCount('SBU');
                assert.strict.equal(counter, 2);
            });
        });
    });
    after(function () {
        pool.end();
    });
});
