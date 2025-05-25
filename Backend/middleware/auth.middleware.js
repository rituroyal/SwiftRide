const User=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


module.exports.isAuth=async(req,res,next)=>{
    const token=req.cookies.token || (req.body && req.body.token) ||(req.header('Authorization') ? req.header('Authorization').replace(/^bearer\s+/i, '') : '');
    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }
    try{
        //utna hi data milega jitna dala tha matlab sirf id
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=await User.findById(decoded._id);
        
        next();
    }
    catch(error){
        return res.status(401).json({error:'Unauthorized'});
    }
}