const express = require("express");

const authController = require("../controllers/auth");

const { check } = require("express-validator");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter valid email !!")
    .custom((value, { req }) => {
      if (value === "singhganesh571@gmail.com") {
        throw new Error("Sorry !! This email is forbidden !!");
      }
    }),
  authController.postSignup
);

module.exports = router;
