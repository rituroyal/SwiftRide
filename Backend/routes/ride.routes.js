const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../controller/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Middleware to check if the user is authenticated

router.post('/create',
    authMiddleware.isAuth,authMiddleware.isUserAuth,
    body('pickup')
        .notEmpty()
        .withMessage('Pickup address is required')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid pickup address'),
    
    body('destination')
        .notEmpty()
        .withMessage('Destination address is required')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid destination address'),
    body('vehicleType')
        .notEmpty()
        .withMessage('Vehicle type is required')
        .isIn(['car', 'auto', 'moto'])
        .withMessage('Invalid vehicle type'),
    rideController.createRide
    
);

router.get('/calculate-Fare',
    authMiddleware.isAuth,authMiddleware.isUserAuth,
    query('pickup')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid pickup address'),
    query('destination')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid destination address'),
    
    rideController.calculateFare
);

router.post("/confirm-ride",
    authMiddleware.isAuth,authMiddleware.isCaptainAuth,
    body('rideId')
        .notEmpty()
        .withMessage('Ride ID is required')
        .isMongoId()
        .withMessage('Invalid Ride ID'),
    
    rideController.confirmRide
);



module.exports = router;