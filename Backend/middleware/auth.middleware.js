const User=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.isAuth=async(req,res,next)=>{
    const token=req.cookies.token || (req.body && req.body.token) ||(req.header('Authorization') ? req.header('Authorization').replace(/^bearer\s+/i, '') : '');
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
        req.user = await User.findById(decoded._id);
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        next();
    }
    catch(error){
        return res.status(401).json({error:'Unauthorized'});
    }
}

module.exports.isCaptainAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Token ko verify karna hai
    const isBlacklisted = await BlacklistToken.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token is blacklisted' });
    }

    try {
        // Utna hi data milega jitna dala tha matlab sirf id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const Captain = await captainModel.findById(decoded._id);
        req.captain = await Captain.findById(decoded._id);
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}


