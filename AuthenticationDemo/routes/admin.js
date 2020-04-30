const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

// /admin/add-product => GET
router.get("/add-product", checkAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", checkAuth, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", checkAuth, adminController.postAddProduct);

router.get(
  "/edit-product/:productId",
  checkAuth,
  adminController.getEditProduct
);

router.post("/edit-product", checkAuth, adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
