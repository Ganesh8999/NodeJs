const express = require("express");
const app = express();
const errorController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const sequelize = require("./util/dbSequelize");

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// .sync({ force: true }) // if you want to force to override the already available table

sequelize
  .sync()
  .then((result) => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Ganesh Singh",
        email: "singhganesh571@gmail.com",
      });
    }

    return user;
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
