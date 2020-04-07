const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;

// const express = require("express");
// const path = require("path");

// const router = express.Router();
// const adminData = require("./admin");

// router.get("/", (req, res, next) => {
//   console.log("In another middleware");
//   console.log("In another middleware");

//   // res.send("<h1>Hello from Express js</h1>");

//   // for configuring file path
//   console.log(adminData.products);

//   const products = adminData.products;

//   // res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // removed for implementing pug engine
//   res.render("shop.pug", { prods: products, docTitle: "Shop" });
// });

// module.exports = router;
