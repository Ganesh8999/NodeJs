// const products = []; // removed because of models implementation

const Product = require("../models/product");
const Cart = require("../models/cart");

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

exports.getProduct = (req, res, next) => {
  const productID = req.params.prodID;

  Product.findProductById(productID, (product) => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
  // Product.getProduct((product) => {
  //   res.render("products/" + productID, {
  //     pageTitle: productID,
  //     path: "/" + productID,
  //   });
  // });
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;

  Product.findProductById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);

    res.redirect("/cart");
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.findProductById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("/shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
