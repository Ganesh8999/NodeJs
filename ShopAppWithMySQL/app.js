const express = require("express");
const app = express();
const errorController = require("./controllers/error");

const Product = require("./models/product");
const User = require("./models/user");

const sequelize = require("./util/dbSequelize");

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    //console.log(result);

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
