const assert = require("assert");
const greeter = require("../greeter.js");
const sinon = require("sinon");
describe("just a silly test", function () {
  it("checks a greetName", function () {
    //  assert.strictEqual(2 + 2, 3);
    assert.strictEqual(
      greeter.greetName("Ganesh"),
      "Hello , Ganesh Today is Monday, March 29, 2021"
    );
  });

  it("checks a greetName with fake date", function () {
    //  assert.strictEqual(2 + 2, 3);
    var clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    assert.strictEqual(
      greeter.greetName("Ganesh"),
      "Hello , Ganesh Today is Friday, January 15, 2021"
    );
    clock.restore();
  });
});
