const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.findById(productID)
    .then((products) => {
      res.render("shop/product-details", {
        product: products,
        pageTitle: products.title,
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
// By using findByPk()

// Product.findByPk(productID)
//   .then((product) => {
//     res.render("shop/product-details", {
//       product: product,
//       pageTitle: product.title,
//       path: "/products",
//     });
//   })
//   .catch((error) => console.log(error));
// };

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => console.log(error));
};

// exports.postDeleteCartItem = (req, res, next) => {
//   const productId = req.body.productId;

//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       console.log("my product" + product);
//       return product.cartItems.destroy();
//     })
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.findById(productId)
    .then((product) => {
      return req.user.addProductToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {});

  // let fetchedCart;
  // let newQuantity = 1;

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;

  //     console.log(cart);

  //     return cart.getProducts({ where: { id: productId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQty = product.cartItems.quantity;
  //       newQuantity = oldQty + 1;
  //       return product;
  //     }

  //     return Product.findByPk(productId);
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));
};

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItems.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//       // console.log(products);
//     })
//     .then((result) => {
//       fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       console.log(orders);
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("/shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
//
