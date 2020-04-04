const express = require("express");

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

app.use(adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).send("<h1> Page Not Found !!!!! ");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
