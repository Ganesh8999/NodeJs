const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        path: "/products",
        pageTitle: "All products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.prodID;

  Product.findProductById(productID)
    .then(([product]) => {
      res.render("shop/product-details", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        path: "/",
        pageTitle: "Shop",
      });
    })
    .catch((error) => {
      console.log(error);
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
