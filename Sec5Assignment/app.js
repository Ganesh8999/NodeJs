const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "pug");
app.set("views", "views");

// const rootDir = require("../Sec5Assignment/util");
const adminData = require("./routes/admin");
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
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});

app.listen(3000);
