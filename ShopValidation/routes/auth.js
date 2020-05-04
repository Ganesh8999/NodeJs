const express = require("express");

const authController = require("../controllers/auth");

const { check, body } = require("express-validator");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email !!")
      .custom((value, { req }) => {
        if (value === "singhganesh571@gmail.com") {
          throw new Error("Sorry !! This email is forbidden !!");
        }
        return true;
      }),

    body(
      "password",
      "please enter the password with only numbers and text and at least 2 characters !!"
    )
      .isLength({ min: 2 })
      .isAlphanumeric(),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password need to match !!!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

module.exports = router;
