const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

// for common p
const p = path.join(
  path.dirname(__dirname, process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      // const productIndex = products.findIndex((prod) => prod.id === id);
      // alternative way of deleting by using filter

      const product = products.find((prod) => prod.id === id);

      const updatedProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatesProducts = [...products];
        updatesProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatesProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });

    // removed because of code refactoring
    // const p = path.join(
    //   path.dirname(process.mainModule.filename),
    //   "data",
    //   "products.json"
    // );
    // fs.readFile(p, (err, fileContent) => {
    //   let products = [];
    //   if (!err) {
    //     products = JSON.parse(fileContent);
    //   }
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     console.log(err);
    //   });
    // });
  }

  // static fetchAll(cb) {
  //   const p = path.join(
  //     path.dirname(process.mainModule.filename),
  //     "data",
  //     "products.json"
  //   );

  //   fs.readFile(p, (err, fileContent) => {
  //     if (err) {
  //       cb([]);
  //     }
  //     cb(JSON.parse(fileContent));
  //   });
  // }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
    //return products;
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};

// const fs = require("fs");
// const path = require("path");

// const products = [];

// module.exports = class Product {
//   constructor(t) {
//     this.title = t;
//   }

//   save() {
//     //products.push(this);
//     const pathDetails = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       products.json
//     );

//     fs.readFile(pathDetails, (err, fileContent) => {
//       let products = [];

//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       fs.writeFile(pathDetails, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     const pathDetails = path.join(
//       path.dirname(process.mainModule.filename),
//       "data",
//       products.json
//     );
//     fs.readFile(pathDetails, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       }
//       return cb(JSON.parse(fileContent));
//     });
//   }
// };
