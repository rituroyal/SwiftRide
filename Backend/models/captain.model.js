const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
            
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        match: [/.+\@.+\..+/, 'please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Password ko query me include nahi karna hai
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active',  'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate number must be at least 3 characters long"],
        },
       capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
       vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'], // Example vehicle types
        },
        location: {
           latitude: {
                type: Number,
                
            },
            longitude: {
                type: Number,
                
            },
       }
    },
});

captainSchema.methods.generateAuthToken = async function () {
    const captain = this;
    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    return token;
};

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);