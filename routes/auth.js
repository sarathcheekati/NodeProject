const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { check, body } = require("express-validator");
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid E-Mail")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address is forbidden.");
        }
        return true;
      }),
    body(
      "password",
      "please enter a password that contains both numbers and letters"
    )
      .isLength({ min: 5, max: 50 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
