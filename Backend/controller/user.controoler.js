
const User=require('../models/user.model.js');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
const validator = require('validator'); // Make sure to install this package
const otpGenerator = require('otp-generator'); // Make sure to install this package
const OTP = require('../models/OTP.js'); // Assuming you have an OTP model defined

module.exports.sendOtp = async (req, res) => {
    try {
        //req ki body se email aayega
        const {email}  = req.body;
        
        
        //validator email is valid or not
       
        const valid = validator.isEmail(email);
        
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }
        

        const checkEmail = await User.findOne({ email });
        
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The Email is Already Register"
            })
        }

        //generateotp
        var generateotp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,

        })
        //var generateotp=crypto.randomInt(10 ** (6 - 1), 10 ** length).toString();
        //console.log("otp generate:", generateotp);

        const result = await OTP.findOne({ otp: generateotp });
       
       
        //check unique
        while (result) {
            generateotp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ Otp: generateotp });
        }
        const payload = { Email: email, Otp: generateotp };
        
        

        const body = await OTP.create(payload);
        console.log(body);

        res.status(201).json({
            success: true,
            message: 'OTP Send Successfully',
            data: body,
        })


    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to send otp"
        })
    }


}
 


module.exports.registerUser=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   
   const { fullname, email, password ,otp} = req.body;
   const valid = validator.isEmail(email);
        
        if (!valid) {
            throw new Error("Please Enter Correct Email")
        }
   
   const isUserExists = await User.findOne({ email });
   
   if (isUserExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
   }

   const recentOtp=await OTP.find({Email:email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp",recentOtp);

        //validate
        if(recentOtp.length==0|| !recentOtp[0]){
            return res.status(401).json({
                success: false,
                message: "OTP Not Fount"
            })
        }

        else if( otp.toString()!==recentOtp[0].Otp.toString()){
            return res.status(401).json({
                success: false,
                message: "Invalid OTP. ENter Valid OTP"
            })
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
