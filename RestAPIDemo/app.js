const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");

const uuidv4 = require("uuid");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "images/png" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "images/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
// CORS - Pre-flight req
//app.options("*", cors());
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE,PUT");
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

app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb://nodeg:nodeg@mongoatlascluster-shard-00-00-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-01-4ebqp.gcp.mongodb.net:27017,mongoatlascluster-shard-00-02-4ebqp.gcp.mongodb.net:27017/messages?ssl=true&replicaSet=MongoAtlasCluster-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    app.listen(8080);
    console.log("MongoDB connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });
