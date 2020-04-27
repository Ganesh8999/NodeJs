const mongodb = require("mongodb");
const getDb = require("../util/db").getDb;

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
