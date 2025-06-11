
const rideModel = require('../models/ride.model');
const { getAddressCoordinate, getDistanceAndTime } = require('./map.service');

const crypto = require("crypto");

function generateOtp(num = 4) {
    const otp = crypto.randomInt(0, 10 ** num).toString().padStart(num, '0');
    return otp;
}
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("Pickup, destination, and vehicle type are required");
    }

    // 1. Convert addresses to coordinates
    const originCoord = await getAddressCoordinate(pickup);
    const destCoord = await getAddressCoordinate(destination);

    
console.log("Origin coordinates:", originCoord);
console.log("Destination coordinates:", destCoord);

    if (!originCoord || !destCoord) {
        throw new Error("Unable to get coordinates for pickup or destination");
    }

    // 2. Get distance and time using coordinates
    const distanceTime = await getDistanceAndTime(originCoord, destCoord);

    // 3. Calculate fare based on vehicle type
    const fare = calculateFare(distanceTime.distance, distanceTime.duration, vehicleType);

    // 4. Create and save ride in DB
    const ride = new rideModel({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare,
        distance: distanceTime.distance,
        duration: distanceTime.duration,
        status: 'pending',
        otp: generateOtp(6), // Generate OTP
    });
    await ride.save();
    return ride;
};


// 💰 Fare Calculation Based on Vehicle Type
function calculateFare(distance, duration, type) {
    const rates = {
        car: { base: 60, perKm: 12, perMin: 2 },
        auto: { base: 40, perKm: 9, perMin: 1.5 },
        moto: { base: 30, perKm: 7, perMin: 1 }
    };

    const vehicleRates = rates[type.toLowerCase()];
    if (!vehicleRates) {
        throw new Error("Invalid vehicle type");
    }

    const fare = vehicleRates.base +
        (distance / 1000) * vehicleRates.perKm +
        (duration / 60) * vehicleRates.perMin;

    // return Math.round(fare);
    return parseFloat(fare.toFixed(2));

}

module.exports.calculateFare = calculateFare;


module.exports.confirmRide=async(rideId, captainId)=> {
    if (!rideId || !captainId) {
        throw new Error("Ride ID and Captain ID are required");
    }
    return rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted',
         captain: captainId
         },
        { new: true }
    ).populate('user');
}
