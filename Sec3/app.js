const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>This is the title of webpage </title></head>");
    res.write("<body>");
    res.write(
      "<form action='create-user' method='POST'>  <input type='text' name='username'>   <button type='submit'>Create user</button> </form>"
    );
    res.write("</body>");
    res.write("</head>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>User List </title></head>");
    res.write("<body>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</body>");
    res.write("</head>");
    return res.end();
  }
  if (url === "/create-user") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody.split("=")[1]); //username = user-input
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }

  //send some response like page not found
});

server.listen(3000);
