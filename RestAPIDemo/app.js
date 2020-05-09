const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const cors = require("cors");
const mongoose = require("mongoose");

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>

app.options("*", cors());
app.use(bodyParser.json()); // application/json
// CORS - Pre-flight req

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS,GET,POST,PUT,PATCH,DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });

app.use("/feed", feedRoutes);
app.listen(8080);
