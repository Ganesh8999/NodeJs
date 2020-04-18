const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// router.get("/products/:prodID", shopController.getProduct);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.post("/cart-delete-item", shopController.postDeleteCartItem);

// router.post("/create-order", shopController.postOrder);

// router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

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
