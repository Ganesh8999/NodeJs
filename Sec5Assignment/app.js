const express = require("express");
const app = express();
const path = require("path");
// const expressHbs = require("express-handlebars"); // removed for implementing EJS

// removed for implementing EJS
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );

// app.set("view engine", "hbs"); // removed for implementing EJS

// app.set("view engine", "pug"); // removed to use express-handlebars as template engine

app.set("view engine", "ejs"); // for ejs there is no need of registering the template engine ,just need to set view engine as ejs
app.set("views", "views");

// const rootDir = require("../Sec5Assignment/util");
//const adminData = require("./routes/admin");// changes because of MVC
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("First Middleware !! ");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second Middleware !!!");
//   res.send("<p>Assignment Solved !!!</p>");
// });

// app.use("/users", (req, res, next) => {
//   console.log("/users middleware");
//   res.send("<p> middleware that handles just /users </p>");
// });
// app.use("/", (req, res, next) => {
//   console.log("/ middleware");
//   res.send("<p> middleware that handles just /</p>");
// });

app.use(express.static(path.join(__dirname, "public")));
//app.use("/admin", adminRoutes);
// app.use("/admin", adminData.routes);// changes because of MVC
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});

app.listen(3000);
