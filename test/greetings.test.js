const assert = require("assert");
const Greetings = require("../greet-manager/greet");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  "postgresql://diction:19970823@localhost:5432/greetings";

const pool = new Pool({
  connectionString
});

describe("Greet testing", function() {
  beforeEach(async function() {
    await pool.query("DELETE FROM greetings;");
    // await pool.query("delete from userName;");
  });

  it("Should able to add a name to database  ", async function() {
    let instanceOfGreet = Greetings(pool);
    await instanceOfGreet.add("diction");
    let userName = await instanceOfGreet.names();
    assert.equal(1, userName.length);
  });

  it("Should able to add multple name's to the database  ", async function() {
    let instanceOfGreet = Greetings(pool);
    await instanceOfGreet.add("diction");
    await instanceOfGreet.add("sbu");
    await instanceOfGreet.add("victor");
    await instanceOfGreet.add("axola");
    let userName = await instanceOfGreet.names();
    assert.equal(4, userName.length);
  });

  describe("Invalid input Testing", function() {
    it("Should not add an invalid name to the database if it contains numbers  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu2134");
      let userName = await instanceOfGreet.names();
      assert.equal(0, userName.length);
    });
  });
  describe("Greet message Testing", function() {
    it("Should be able to greet a user in if the the language selected is Zulu  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "Zulu");
      let message = await instanceOfGreet.hello();
      assert.equal(message, "Sawubona, Sbu");
    });
    it("Should be able to greet a user in if the the language selected is English  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "English");
      let message = await instanceOfGreet.hello();
      assert.equal(message, "Hello, Sbu");
    });
    it("Should be able to greet a user in if the the language selected is Afrikaans  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "Afrikaans");
      let message = await instanceOfGreet.hello();
      assert.equal(message, "Hallo, Sbu");
    });
    it("Should be able to greet a user in if the the language selected is Tsonga  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "English");
      let message = await instanceOfGreet.hello();
      assert.equal(message, "Hello, Sbu");
    });
    it("Should be able to greet a user in if the the language selected is Xhosa  ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "Xhosa");
      let message = await instanceOfGreet.hello();
      assert.equal(message, "Molo, Sbu");
    });
  });
  describe("Greet counter Testing", function() {
    it("Should be able to show how many users have been greeted in the app ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "Zulu");
      await instanceOfGreet.add("diction", "Zulu");
      let counter = await instanceOfGreet.count();
      assert.deepEqual(counter, [{ count: "2" }]);
    });
    it("Should be able to show how many users have been greeted in the app ", async function() {
      let instanceOfGreet = Greetings(pool);
      await instanceOfGreet.add("sbu", "Zulu");
      await instanceOfGreet.add("diction", "Zulu");
      let counter = await instanceOfGreet.count();
      assert.deepEqual(counter, [{ count: "2" }]);
    });
    describe("User counter Testing", function() {
      it("Should be able to show the counter for each user that how many times there were greeted ", async function() {
        let instanceOfGreet = Greetings(pool);
        await instanceOfGreet.add("sbu", "Zulu");
        await instanceOfGreet.add("sbu", "Zulu");
        let counter = await instanceOfGreet.userCount("Sbu");
        assert.equal(counter, 2);
      });
    });
  });
  after(function() {
    pool.end();
  });
});
