const express = require("express");
const authController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { validateRequest } = validationMiddleware;

const router = express.Router();

router.post(
  "/register",
  validateRequest([
    validationMiddleware.validateName,
    validationMiddleware.validateEmail,
    validationMiddleware.validatePassword,
  ]),
  authController.register
);

router.post(
  "/login",
  validateRequest([
    validationMiddleware.validateEmail,
    validationMiddleware.validatePassword,
  ]),
  authController.login
);

router.get("/logout", authController.logout);

module.exports = router;
