const express = require("express");

const authController = require("../controllers/auth");
const User = require("../models/user");

const { check, body } = require("express-validator");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter valid email !!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject(
              "user with this email id is not regd. maybe email or password is wrong !!"
            );
          }
        });
      }),
    body(
      "password",
      "please enter the password with only numbers and text and at least 2 characters !!"
    )
      .isLength({ min: 2 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email !!")
      .normalizeEmail()
      .custom((value, { req }) => {
        // This is first way
        // if (value === "singhganesh571@gmail.com") {
        //   throw new Error("Sorry !! This email is forbidden !!");
        // }
        // return true;

        // This is second way

        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email has been already used !!");
          }
        });
      }),

    body(
      "password",
      "please enter the password with only numbers and text and at least 2 characters !!"
    )
      .isLength({ min: 2 })
      .isAlphanumeric()
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password need to match !!!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

module.exports = router;
