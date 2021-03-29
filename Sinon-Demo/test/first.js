const assert = require("assert");

const greeter = require("../greeter.js");

describe("just a silly test", function () {
  it("checks a greetName", function () {
    //  assert.strictEqual(2 + 2, 3);
    assert.strictEqual(
      greeter.greetName("Ganesh"),
      "Hello , Ganesh Today is Monday, March 29, 2021"
    );
  });
});
