const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const {
  validateRequest,
  validateUserUpdate,
  validateUserId,
} = require("../middlewares/validationMiddleware");

router.put(
  "/:id",
  validateRequest(validateUserUpdate),
  userController.updateUser
);

router.delete(
  "/:id",
  validateRequest(validateUserId),
  userController.deleteUser
);

module.exports = router;
