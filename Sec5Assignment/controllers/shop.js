// const products = []; // removed because of models implementation

const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  // const products = adminData.products; // removed to implement controllers
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      // removed it was needed for handlebars code but now there is no need in EJS
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
  }); // Added because of models implementation
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      path: "/",
      pageTitle: "Shop",
      // removed it was needed for handlebars code but now there is no need in EJS
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("/shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
