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
  req.session.isLoggedIn = true;
  res.redirect("/");
};
