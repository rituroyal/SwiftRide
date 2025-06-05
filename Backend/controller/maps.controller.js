const mapsService = require('../services/map.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        res.status(404).json({ error: "Coordinate not Found" });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    const { origin, destination } = req.query;
    // origin = "Bhopal", destination = "Indore" → pehle coordinate lo
    try {
        const originCoord = await mapsService.getAddressCoordinate(origin);
        const destCoord = await mapsService.getAddressCoordinate(destination);
        const result = await mapsService.getDistanceAndTime(originCoord, destCoord);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

