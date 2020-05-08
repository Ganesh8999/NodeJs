const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const { body } = require("express-validator");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const deleteProduct = require("../public/js/admin");

// /admin/add-product => GET
router.get("/add-product", checkAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", checkAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Title must at least 2 characters")
      .isString()
      .isLength({ min: 2 })
      .trim(),

    body("price", "price must be float").isFloat().trim(),
    body("description", "description must be at least 5 characters !!!")
      .isLength({ min: 5, max: 400 })
      .isAlphanumeric()
      .trim(),
  ],
  checkAuth,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",

  checkAuth,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title", "Title must at least 2 characters")
      .isString()
      .isLength({ min: 2 })
      .trim(),
    body("price", "price must be float").isFloat().trim(),
    body("description", "description must be at least 5 characters !!!")
      .isLength({ min: 5, max: 400 })
      .isAlphanumeric()
      .trim(),
  ],
  checkAuth,
  adminController.postEditProduct
);

// For understanding Async requests
// router.post("/delete-product", adminController.postDeleteProduct);
router.delete("/product/:productId", checkAuth, adminController.deleteProduct);

module.exports = router;
