const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.flash("error"));

  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(message + "message ");

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(message + "message ");

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or wrong password !!");
        return req.session.save((err) => {
          res.redirect("/login");
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email already used !!");
        return req.session.save((err) => {
          res.redirect("/signup");
        });
        // return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          console.log(user);

          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

// const User = require("../models/user");
// const bycrypt = require("bcryptjs");

// exports.getLogin = (req, res, next) => {
//   res.render("auth/login", {
//     path: "/login",
//     pageTitle: "Login",
//     isAuthenticated: false,
//   });
// };

// exports.postLogin = (req, res, next) => {
//   User.findById("5ea3eb951ff28231d01dc048")
//     .then((user) => {
//       req.session.isLoggedIn = true;
//       req.session.user = user;
//       req.session.save((err) => {
//         console.log(err);
//         res.redirect("/");
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postSignup = (req, res, next) => {
//   const email = req.body.email;
//   console.log(email);

//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;

//   User.findOne({ email: email }).then((userDoc) => {
//     if (userDoc) {
//       return res.redirect("/signup");
//     }
//     return bycrypt
//       .hash(password, 12)
//       .then((hashedPassword) => {
//         const user = new User({
//           email: email,
//           password: hashedPassword,
//           cart: { items: [] },
//         });
//         return user.save();
//       })

//       .then((result) => {
//         res.redirect("/login");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// };

// exports.postLogout = (req, res, next) => {
//   req.session.destroy((err) => {
//     console.log(err);

//     res.redirect("/");
//   });
// };

// exports.getSignup = (req, res, next) => {
//   res.render("auth/signup", {
//     path: "/signup",
//     pageTitle: "Signup",
//     isAuthenticated: false,
//   });
// };
