const path = require("path");
// For EJS branch testing

const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;

// removed we no longer need here bcz of mvc
// exports.routes = router;
// exports.products = products;

// const path = require("path");

// const express = require("express");

// // const rootDir = require("../util/path");

// const router = express.Router();

// const products = [];

// // /admin/add-product => GET
// router.get("/add-product", (req, res, next) => {
//   res.render("add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//   });
// });

// // /admin/add-product => POST
// router.post("/add-product", (req, res, next) => {
//   products.push({ title: req.body.title });
//   res.redirect("/");
// });

// exports.routes = router;
// exports.products = products;

// // const express = require("express");
// // const path = require("path");

// // const router = express.Router();
// // const products = [];

// // // /admin/add-product => GET
// // router.get("/add-product", (req, res, next) => {
// //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
// // });

// // // /admin/add-product => POST
// // router.post("/add-product", (req, res, next) => {
// //   // console.log(req.body);
// //   products.push({ title: req.body.title });
// //   res.redirect("/");
// // });

// // exports.routes = router;
// // exports.products = products;

// // // module.exports = router;
// // // module.exports = products;
