const assert = require("assert");
const Greet = require("../fuunction/greet");

describe("Greetings Language Tests", function() {
  it("should be able to greet a person in Zulu language ", function() {
    let instance = Greet();
    //   instance
    assert.equal(instance.greet("Sbu", "Zulu"), "Sawubona, SBU");
  });

  it("should be able to greet a person in English language ", function() {
    let instance = Greet();
    assert.equal(instance.greet("Sbu", "English"), "Hello, SBU");
  });

  it("should be able to greet a person in Afrikaans language ", function() {
    let instance = Greet();
    assert.equal(instance.greet("Sbu", "Afrikaans"), "Hallo, SBU");
  });
});
describe("Greetings Counter Tests", function() {
  it("should be able to show 1 if the person was greeted once ", function() {
    let instance = Greet();
    instance.greet("Sbu", "Afrikaans");
    assert.equal(instance.count(), 1);
  });

  it("should be able to show 3 if the number of people greeted was 3 ", function() {
    let instance = Greet();
    instance.greet("Sbu", "Afrikaans");
    instance.greet("Axola", "English");
    instance.greet("Sesethu", "Zulu");
    assert.equal(instance.count(), 3);
  });

  it("should be not increment or increase counter if same person was greeted many times ", function() {
    let instance = Greet();
    instance.greet("Sesethu", "Afrikaans");
    instance.greet("Sesethu", "English");
    instance.greet("Sesethu", "Zulu");
    assert.equal(instance.count(), 1);
  });
});

describe("Greetings Counter Storage Test", function() {
  it("should be able to show the name or return name of person greeted ", function() {
    let instance = Greet();
    instance.greet("Sbu", "Afrikaans");
    assert.deepEqual(instance.objectName(), { SBU: 0 });
  });

  it("should be able not to add a name twice should only return one ", function() {
    let instance = Greet();
    instance.greet("Sbu", "Afrikaans");
    instance.greet("Sbu", "Afrikaans");
    assert.deepEqual(instance.objectName(), { SBU: 0 });
  });

  it("should be able return a list of names greeted ", function() {
    let instance = Greet();
    instance.greet("Sbu", "Afrikaans");
    instance.greet("Victor", "Afrikaans");
    instance.greet("Sesethu", "Afrikaans");
    instance.greet("Axola", "Afrikaans");
    assert.deepEqual(instance.objectName(), {
      SBU: 0,
      AXOLA: 0,
      SESETHU: 0,
      VICTOR: 0
    });
  });
});
describe("Greetings erro handling Test", function() {
  it("should return a message if you enter a name with numbers or invalid charecters ", function() {
    let instance = Greet();
    assert.deepEqual(
      instance.greet("Sbu21", "Afrikaans"),
      "Please use letters only! "
    );
  });

  it("should return a message if the name is not entered and language not selected ", function() {
    let instance = Greet();
    assert.deepEqual(
      instance.greet("", ""),
      "Please input name and select language!"
    );
  });

  it("should return a message if the language was not selected ", function() {
    let instance = Greet();
    assert.deepEqual(instance.greet("Sbu", ""), "Please select language!");
  });
});
