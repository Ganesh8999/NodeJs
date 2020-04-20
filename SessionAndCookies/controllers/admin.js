const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      console.log(result);
      console.log("Product created!");
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }

//   console.log(editMode);

//   const prodId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: prodId } })

//     //Product.findByPk(prodId)
//     .then((products) => {
//       console.log(product);
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: products[0],
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   console.log(productId);
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log("Product destroyed !!");

//       res.redirect("/admin/products");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;
//       return product.save();
//     })
//     .then((result) => {
//       console.log("Product updated!");
//       res.redirect("/admin/products");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
