const express = require('express');
const router = express.Router();
const { sendOtp } = require('../controller/user.controoler.js');

router.post('/send-otp', sendOtp);


module.exports = router;
