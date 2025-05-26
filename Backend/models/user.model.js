const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { use } = require('../app');

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            trim:true,
            minlength:[3,"First name must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters long"],
            trim:true,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    //live track user online or offline
    socketId:{
        type:String,
    },
    
})

userSchema.methods.generateAuthToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const User=mongoose.model('User',userSchema);

module.exports=User;











