const express = require('express');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { validateRequest } = validationMiddleware;

const router = express.Router();

router.use(authMiddleware);

router.get(
    '/catways/:id/reservations',
    validateRequest([validationMiddleware.validateId]),
    reservationController.getReservationsByCatway
);

router.get(
    '/catways/:id/reservations/:idReservation',
    validateRequest([
        validationMiddleware.validateId,
        validationMiddleware.validateReservationId
    ]),
    reservationController.getReservationById
);

router.post(
    '/catways/:id/reservations',
    validateRequest([
        validationMiddleware.validateId,
        validationMiddleware.validateReservation
    ]),
    reservationController.createReservation
);

router.delete(
    '/catways/:id/reservations/:idReservation',
    validateRequest([
        validationMiddleware.validateId,
        validationMiddleware.validateReservationId
    ]),
    reservationController.deleteReservation
);

module.exports = router;