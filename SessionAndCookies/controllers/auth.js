const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //console.log(req.get("Cookie"));
  //const isLoggedIn = req.get("Cookie").split(";")[0].split("=")[1] === "true";

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true;Max-Age=10");

  User.findById("5ea3eb951ff28231d01dc048")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
};
