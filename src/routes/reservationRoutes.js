const express = require("express");
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { validateRequest } = validationMiddleware;

const router = express.Router();

router.use(authMiddleware);

router.get("/", reservationController.getAllReservations);

router.get(
  "/:id",
  validateRequest(validationMiddleware.validateId),
  reservationController.getReservationsByCatway
);

router.get(
  "/:reservationId/details",
  validateRequest([...validationMiddleware.validateReservationId]),
  reservationController.getReservationById
);

router.post(
  "/:id",
  validateRequest([
    ...validationMiddleware.validateId,
    ...validationMiddleware.validateReservation,
  ]),
  reservationController.createReservation
);

router.delete(
  "/:reservationId",
  validateRequest([...validationMiddleware.validateReservationId]),
  reservationController.deleteReservation
);

module.exports = router;
