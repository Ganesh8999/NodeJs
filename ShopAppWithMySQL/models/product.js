const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/dbSequelize");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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
