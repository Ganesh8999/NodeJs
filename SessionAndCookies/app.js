const express = require("express");
const app = express();
const errorController = require("./controllers/error");
const mongoConnect = require("./util/db").mongoConnect;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI =
  "mongodb://nodeg:nodeg@mongoatlascluster-shard-00-00-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-01-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-02-4ebqp.gcp.mongodb.net:27017/shop?ssl=true&replicaSet=MongoAtlasCluster-shard-0&authSource=admin&retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "Ganesh Secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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
app.use(authRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
