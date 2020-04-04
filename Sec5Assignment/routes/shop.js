const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("In another middleware");
  console.log("In another middleware");

  // res.send("<h1>Hello from Express js</h1>");

  // for configuring file path
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
