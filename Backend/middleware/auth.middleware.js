const User=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.isAuth=async(req,res,next)=>{
    const token=req.cookies.token || (req.body && req.body.token) ||(req.header('Authorization') ? req.header('Authorization').replace(/^bearer\s+/i, '') : '');
    console.log('token',token)
    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }
    

    //token ko verify karna hai
    const isBlacklisted = await BlacklistToken.findOne({token: token});
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token is blacklisted' });
    }

    try{
        //utna hi data milega jitna dala tha matlab sirf id
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
         req.token = token;
         req.decodedId = decoded._id;
          
        next();
    }
    catch(error){
        return res.status(401).json({error:'Unauthorized'});
    }
}

module.exports.isUserAuth = async (req, res, next) => {
    
    try {
        // Utna hi data milega jitna dala tha matlab sirf id
        
        const user = await User.findById(req.decodedId).select('-password'); // +password to include password field if needed
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        console.log("User found:", user);
        req.user = user;
        
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

module.exports.isCaptainAuth = async (req, res, next) => {
    
    try {
        // Utna hi data milega jitna dala tha matlab sirf id
        const Captain = await captainModel.findById(req.decodedId).select('-password'); // +password to include password field if needed
        if (!Captain) {
            return res.status(401).json({ error: 'Captain not found' });
        }
        req.captain = Captain
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}


