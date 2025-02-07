const { body, param, validationResult } = require("express-validator");

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

exports.validateName = body("name")
  .isLength({ min: 3 })
  .withMessage("Le nom doit contenir au moins 3 caractères.")
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
  .withMessage(
    "Le nom ne doit contenir que des lettres, espaces, apostrophes ou tirets."
  )
  .notEmpty()
  .withMessage("Le nom est obligatoire.");

exports.validateEmail = body("email")
  .isEmail()
  .withMessage("L'email doit être valide.");

exports.validatePassword = body("password")
  .isLength({ min: 6 })
  .withMessage("Le mot de passe doit contenir au moins 6 caractères.");

exports.validateCatway = [
  body("catwayNumber")
    .isInt({ gt: 0 })
    .withMessage("Le numéro du catway doit être un entier positif."),
  body("type")
    .isIn(["long", "short"])
    .withMessage('Le type doit être soit "long" soit "short".'),
  body("catwayState")
    .isString()
    .withMessage(
      "La description du catway doit être une chaîne de caractères."
    ),
];

exports.validateReservationId = [
  param("reservationId")
    .isMongoId()
    .withMessage(
      "ID de réservation invalide (doit être un ID MongoDB valide)."
    ),
];

exports.validateReservation = [
  body("clientName")
    .isString()
    .notEmpty()
    .withMessage("clientName est obligatoire."),
  body("boatName")
    .isString()
    .notEmpty()
    .withMessage("boatName est obligatoire."),
  body("checkIn")
    .isISO8601()
    .toDate()
    .withMessage(
      "Le début de la réservation doit être une date valide au format ISO 8601."
    ),
  body("checkOut")
    .isISO8601()
    .toDate()
    .withMessage(
      "La fin de la réservation doit être une date valide au format ISO 8601."
    ),
  body("checkOut").custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.checkIn)) {
      throw new Error(
        "La date de fin doit être après la date de début de la réservation ."
      );
    }
    return true;
  }),
];

exports.validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom d'utilisateur est requis")
    .isLength({ min: 3, max: 30 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 30 caractères"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("L'email doit être valide"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

exports.validateUserUpdate = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("L'ID de l'utilisateur est requis")
    .isMongoId()
    .withMessage("ID utilisateur invalide"),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 30 caractères"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("L'email doit être valide"),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

exports.validateUserId = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("L'ID de l'utilisateur est requis")
    .isMongoId()
    .withMessage("ID utilisateur invalide"),
];

exports.validateId = [
  param("id")
    .isMongoId()
    .withMessage("ID invalide (doit être un ID MongoDB valide)."),
];
