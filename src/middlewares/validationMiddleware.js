const { body, param, validationResult } = require('express-validator');

// Middleware pour valider les données de la requête
exports.validateRequest = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

exports.validateName = body('name')
    .notEmpty()
    .withMessage('Le nom est obligatoire.');

// Validation pour le champ "email"
exports.validateEmail = body('email')
    .isEmail()
    .withMessage('L\'email doit être valide.');

// Validation pour le champ "password"
exports.validatePassword = body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères.');

// Validations pour les routes liées aux catways
exports.validateCatway = [
    body('catwayNumber')
        .isInt({ gt: 0 })
        .withMessage('Le numéro du catway doit être un entier positif.'),
    body('type')
        .isIn(['long', 'short'])
        .withMessage('Le type doit être soit "long" soit "short".'),
    body('catwayState')
        .isString()
        .withMessage('La description du catway doit être une chaîne de caractères.'),
];

// Validations pour les routes liées aux réservations

exports.validateReservationId = param('idReservation')
    .isMongoId()
    .withMessage('ID de réservation invalide (doit être un ID MongoDB valide).');
    
exports.validateReservation = [
    body('clientName')
        .isString()
        .notEmpty()
        .withMessage('clientName est obligatoire.'),
    body('boatName')
        .isString()
        .notEmpty()
        .withMessage('boatName est obligatoire.'),
    body('checkIn')
        .isISO8601()
        .toDate()
        .withMessage('Le début de la réservation doit être une date valide au format ISO 8601.'),
    body('checkOut')
        .isISO8601()
        .toDate()
        .withMessage('La fin de la réservation doit être une date valide au format ISO 8601.'),
    body('checkOut').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.checkIn)) {
            throw new Error('La date de fin doit être après la date de début de la réservation .');
        }
        return true;
    }),
];

// Validation des paramètres de route
exports.validateId = [
    param('id').isMongoId().withMessage('ID invalide (doit être un ID MongoDB valide).'),
];
