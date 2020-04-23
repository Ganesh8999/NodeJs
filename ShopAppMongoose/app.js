const express = require("express");
const app = express();
const errorController = require("./controllers/error");

const mongoose = require("mongoose");
const User = require("./models/user");

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   User.findById("5ea13530ec1339404f386beb")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb://nodeg:nodeg@mongoatlascluster-shard-00-00-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-01-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-02-4ebqp.gcp.mongodb.net:27017/shop?ssl=true&replicaSet=MongoAtlasCluster-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(3000);
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
