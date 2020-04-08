const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
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
    const p = path.join(
      path.dirname(__dirname, process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      try {
        products = JSON.parse(fileContent);
        callBack(products);
      } catch (err) {
        fs.writeFile(p, "[]", (err) => {
          if (err) {
            console.log(err);
            return;
          }

          callBack([]);
        });
      }
    });
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
