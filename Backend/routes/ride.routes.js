const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controller/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Middleware to check if the user is authenticated

router.post('/create',
    authMiddleware.isAuth,
    body('pickup')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid pickup address'),
    
    body('destination')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid destination address'),
    body('vehicleType')
        .isIn(['car', 'auto', 'moto'])
        .withMessage('Invalid vehicle type'),
    rideController.createRide
    
);


module.exports = router;