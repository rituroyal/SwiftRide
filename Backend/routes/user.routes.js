const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controller/user.controoler');
const authMiddleware=require("../middleware/auth.middleware")

router.post('/register',
    [body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long')],userController.registerUser);
router.post('/login',[
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min:6}).withMessage("Password is invalid")
],userController.login)

router.get('/profile', authMiddleware.isAuth,authMiddleware.isUserAuth, userController.profile)
router.get('/logout', authMiddleware.isAuth, authMiddleware.isUserAuth, userController.logoutUser)

router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
module.exports=router;


