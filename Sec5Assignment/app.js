const express = require("express");

const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

const bodyParser = require("body-parser");

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
