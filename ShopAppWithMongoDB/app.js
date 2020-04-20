const express = require("express");
const app = express();
const errorController = require("./controllers/error");
const mongoConnect = require("./util/db").mongoConnect;

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //   User.findByPk(1)
  //     .then((user) => {
  //       req.user = user;
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });
