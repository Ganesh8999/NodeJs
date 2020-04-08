const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
