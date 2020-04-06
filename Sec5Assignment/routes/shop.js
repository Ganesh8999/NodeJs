const express = require("express");
const path = require("path");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log("In another middleware");
  console.log("In another middleware");

  // res.send("<h1>Hello from Express js</h1>");

  // for configuring file path
  console.log(adminData.products);

  // res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // removed for implementing pug engine
  res.render("shop.pug");
});

module.exports = router;
