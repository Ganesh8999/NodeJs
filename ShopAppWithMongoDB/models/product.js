const getDb = require("../util/db").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    //db.collection("products").insertOne({ name: "A book", price: 12.99 });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Product;
// commented because of Sequelize implementation
// const db = require("../util/db");

// const Cart = require("./cart");

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   static deleteById(id) {}

//   save() {
//     return db.execute(
//       "INSERT INTO PRODUCTS (title,price,description,imageUrl) VALUES (?,?,?,?)",

//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM PRODUCTS");
//   }

//   static findProductById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id =?", [id]);
//   }
// };
