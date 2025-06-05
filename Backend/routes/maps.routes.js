const express = require('express');
const router = express.Router(); 
const {isAuth} = require('../middleware/auth.middleware');  
const { getCoordinate } = require('../controller/maps.controller'); 
const {query} = require('express-validator');

router.get('/get-coordinate',
    query('address')
        .notEmpty()
        .withMessage('Address is required')
        .isString()
        .withMessage('Address must be a string'),
     isAuth, getCoordinate);


module.exports = router;