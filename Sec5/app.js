const http = require("http");
const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("in the middleware1");
//   next(); //  allows the request to continue to the next middleware in line
// });
app.use("/app-product", (req, res, next) => {
  console.log("in the middleware2");
  res.send("<h1>Hi this is Express js app product</h1>");
});
app.use("/", (req, res, next) => {
  console.log("in the middleware2");
  res.send("<h1>Hi this is Express js  code</h1>");
});

app.listen(3000);
// const server = http.createServer(app);
// server.listen(3000);
