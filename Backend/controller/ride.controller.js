const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const {sendMessage, sendMessageToSocketId}=require("../socket.js");
const rideModel = require('../models/ride.model.js');
module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        console.log("Creating ride for user:", req.user);
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        })
         res.status(201).json(ride);

         const pickupCoord = await mapService.getAddressCoordinate(pickup);
        
        const captainRadius = await mapService.getCaptainInTheRadius(pickupCoord.lat, pickupCoord.lng, 50); // 5 km radius
       
        ride.otp='';
        const rideWithUser = await rideModel.findOne({_id:ride._id}).populate('user');
        console.log("Ride created:", rideWithUser);

        captainRadius.map(captain=>{
            sendMessage(captain.socketId, {
                event:'new-ride',
                data:rideWithUser
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
        //console.log("Distance:", distanceTime.distance, "km");
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

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        
        const ride = await rideService.confirmRide(rideId, req.captain._id);
        if (!ride) {
            return res.status(404).json({ error: "Ride not found or already confirmed" });
        }

        // Notify the user about the ride confirmation
        sendMessage(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        res.status(200).json(ride);
    } catch (error) {
        console.error("Error confirming ride:", error);
        res.status(500).json({ error: "Failed to confirm ride" });
    }
};







module.exports.rideStart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
       
        const ride = await rideService.startRide(rideId, req.captain, otp);


        if (!ride) {
            return res.status(404).json({ error: "Ride not found or OTP mismatch" });
        }

        sendMessage(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);

    } catch (err) {
        console.error("❌ Error in rideStart:", err);
        return res.status(500).json({ error: "Failed to start ride" });
    }
};


// Finish the ride
module.exports.endRide = async (req, res) => {
    const { rideId } = req.body;
    console.log("🎯 rideId received in endRide:", rideId);
    try {
      const ride = await rideModel.findById(rideId);
  
        if (!ride) {
            console.log("❌ Ride not found in DB");
        return res.status(404).json({ error: "Ride not found" });
      }
  
      // Mark ride as completed
      ride.status = 'completed';
      await ride.save();
  
      // Optional: Notify user and captain if needed via socket
      sendMessage(ride.user.socketId, {
        event: 'ride-ended',
        data: { message: 'Ride completed successfully' }
      });
  
      res.status(200).json({ message: 'Ride ended successfully' });
    } catch (error) {
      console.error("❌ Error ending ride:", error);
      res.status(500).json({ error: "Failed to end ride" });
    }
  };
  
