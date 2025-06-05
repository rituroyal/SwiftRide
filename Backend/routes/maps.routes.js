const express = require('express');
const router = express.Router(); 
const {isAuth} = require('../middleware/auth.middleware');  
const { getCoordinate, getDistanceTime } = require('../controller/maps.controller'); 
const {query} = require('express-validator');

router.get('/get-coordinate',
    query('address')
        .notEmpty()
        .withMessage('Address is required')
        .isString()
        .withMessage('Address must be a string'),
     isAuth, getCoordinate);

     router.get('/get-distance-time',
        query('origin')
            .isString()
            .isLength({ min: 3 }),
        query('destination')
            .isString()
            .isLength({ min: 3 }),
        isAuth,
        getDistanceTime 
    );
module.exports = router;
