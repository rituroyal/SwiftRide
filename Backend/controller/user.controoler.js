const User=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

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
   res.cookie('token',token)
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
