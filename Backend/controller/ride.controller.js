const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const {sendMessage}=require("../socket.js")
module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        console.log("Creating ride for user:", req.user._id);
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
         res.status(201).json(ride);

         const pickupCoord = await mapService.getAddressCoordinate(pickup);
        console.log("Pickup coordinates:", pickupCoord);
        const captainRadius = await mapService.getCaptainInTheRadius(pickupCoord.lat, pickupCoord.lng, 5); // 5 km radius
        console.log("Captains in the radius:", captainRadius);
        ride.otp='';

        captainRadius.map(captain=>{
            sendMessage(captain._id, {
                event:'new-ride',
                data:ride
            });
        }) 
    } catch (error) {
        console.error("Error creating ride:", error);
        res.status(500).json({ error: "Failed to create ride" });
    }
};

module.exports.calculateFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        console.log("Calculating fare for pickup:", pickup, "destination:", destination);

        const originCoord = await mapService.getAddressCoordinate(pickup);
        const destCoord = await mapService.getAddressCoordinate(destination);

        if (!originCoord || !destCoord) {
            return res.status(400).json({ error: "Unable to get coordinates" });
        }

        const distanceTime = await mapService.getDistanceAndTime(originCoord, destCoord);
        console.log("Distance:", distanceTime.distance, "km");
        const vehicleTypes = ['car', 'auto', 'moto'];
        const fares = {};

        for (const type of vehicleTypes) {
            fares[type] = rideService.calculateFare(
                distanceTime.distance,
                distanceTime.duration,
                type
            );
        }

        res.status(200).json({ fares, distance: distanceTime.distance, duration: distanceTime.duration });
    } catch (error) {
        console.error("Error calculating fare:", error);
        res.status(500).json({ error: "Failed to calculate fare" });
    }
};

