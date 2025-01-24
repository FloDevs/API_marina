const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { validateRequest } = validationMiddleware;

router.use(authMiddleware);

router.get('/', catwayController.getAllCatways);

router.get(
    '/:id',
    validateRequest([validationMiddleware.validateId]),
    catwayController.getCatwayById
);

router.post(
    '/',
    validateRequest([validationMiddleware.validateCatway]),
    catwayController.createCatway
);

router.put(
    '/:id',
    validateRequest([validationMiddleware.validateId, validationMiddleware.validateCatway]),
    catwayController.updateCatway
);

router.patch(
    '/:id',
    validateRequest([validationMiddleware.validateId, validationMiddleware.validatePartialCatway]),
    catwayController.partialUpdateCatway
);

router.delete(
    '/:id',
    validateRequest([validationMiddleware.validateId]),
    catwayController.deleteCatway
);

module.exports = router;
