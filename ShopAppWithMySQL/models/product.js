const db = require("../util/db");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static deleteById(id) {}

  save() {
    return db.execute(
      "INSERT INTO PRODUCTS (title,price,description,imageUrl) VALUES (?,?,?,?)",

      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM PRODUCTS");
  }

  static findProductById(id) {
    return db.execute("SELECT * FROM products WHERE products.id =?", [id]);
  }
};
