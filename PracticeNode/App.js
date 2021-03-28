const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});

// // Load the http module
// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 3000;

// // create the HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {
//   // set the response header with http status and content type
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello I am Node Js \n");
// });

// // listen for the request on the port   3000 and as s callback function have the port listened on logged

// server.listen(port, hostname, () => {
//   console.log(`Server running at the http://${hostname}:${port}/`);
// });
