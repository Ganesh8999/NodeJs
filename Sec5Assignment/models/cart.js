const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // removed contructor bcz we don't need multiple instance of cart model, just want only that will manage products in the cart
  // static  method is better than constructor
  //   constructor() {
  //     this.products = [];
  //     this.totalPrice = 0;
  //   }

  // fetch the previous products of cart
  // analyze the cart
  // Add new product in the cart or increase the quantity of product
  static addProduct(id, productPrice) {
    // fetch the previous products of cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart => finding the existing product
      const existingProductIndex = cart.products.find((prod) => prod.id === id);

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products, updatedProduct];
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
