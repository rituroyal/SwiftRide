const User=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

const otpModel = require('../models/otp.model');


module.exports.sendOtp = async (req, res) => {
   const { phone } = req.body;
 
   // Basic validation: must be 10 digits
   const phoneRegex = /^[6-9]\d{9}$/;
 
   if (!phone || !phoneRegex.test(phone)) {
     return res.status(400).json({ error: 'Invalid phone number format' });
   }
 
   // Generate 6-digit OTP
   const otp = Math.floor(100000 + Math.random() * 900000).toString();
 
   // Save OTP
   await otpModel.findOneAndUpdate(
     { phone },
     { otp, expiresAt: Date.now() + 5 * 60 * 1000 },
     { upsert: true, new: true }
   );
 
   console.log(`OTP for ${phone} is ${otp}`);
 
   res.status(200).json({ message: 'OTP sent successfully' });
 };
 
 
module.exports.verifyOtp = async (req, res) => {
   const { phone, otp } = req.body;
 
   const otpRecord = await otpModel.findOne({ phone, otp });
 
   if (!otpRecord || otpRecord.expiresAt < Date.now()) {
     return res.status(400).json({ error: 'Invalid or expired OTP' });
   }
 
   // Check if user already exists with this phone
   let user = await User.findOne({ phone });
   if (!user) {
     // check if user exists by dummy email
     const email = `${phone}@rideurway.com`;
     user = await User.findOne({ email });
 
     if (!user) {
       // Create dummy user only if not already created
       user = await userService.createUser({
         firstname: 'Guest',
         lastname: 'Usr',
         phone,
         email,
         password: 'dummy@123', // a placeholder password
       });
     }
   }
 
   // Generate token
   const token = await user.generateAuthToken();
 
   // Cleanup OTP
   await otpModel.deleteOne({ phone });
 
   // res.cookie('token', token);

   res.cookie('token', token, {
      httpOnly: true,
      secure: false,               // true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
   res.status(200).json({ user, token });
 };
 


module.exports.registerUser=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   
   const { fullname, email, password } = req.body;
   
   const isUserExists = await User.findOne({ email });
   
   if (isUserExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
   }

   const hashedPassword=await User.hashPassword(password);
   const user=await userService.createUser({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedPassword});
   const token=await user.generateAuthToken();
   res.status(201).json({user,token});
}

module.exports.login=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   const {email,password}=req.body;
   //+password is used to  get password field selected in the response
   const user=await User.findOne({email}).select('+password');
   if(!user){
      return res.status(401).json({error:'Invalid email or password'});
   }
   const isMatch=await user.comparePassword(password);
   if(!isMatch){
      return res.status(401).json({error:'Invalid email or password'});
   }
   const token=await user.generateAuthToken();
   // res.cookie('token',token)
   res.cookie('token', token, {
      httpOnly: true,
      secure: false,          // ⚠️ true if using HTTPS (production)
      sameSite: 'Lax',        // or 'Strict'/'None'
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    });
    
   res.status(200).json({user,token});
}

module.exports.profile=async(req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser=async(req,res,next)=>{
   
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   
   await blacklistTokenModel.create({ token });

   res.status(200) .json({message:'Logged out successfully'});
}
