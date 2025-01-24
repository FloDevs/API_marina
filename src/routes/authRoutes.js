const express = require('express');
const authController = require('../controllers/authController'); // Import du contrôleur
const validationMiddleware = require('../middlewares/validationMiddleware');
const { validateRequest } = validationMiddleware;

const router = express.Router();

router.post(
    '/register',
    validateRequest([
        validationMiddleware.validateName,
        validationMiddleware.validateEmail,
        validationMiddleware.validatePassword
    ]),
    authController.register
);

router.post(
    '/login',
    validateRequest([
        validationMiddleware.validateEmail,
        validationMiddleware.validatePassword
    ]),
    authController.login
);

module.exports = router;
