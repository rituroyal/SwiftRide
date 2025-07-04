const { default: axios } = require("axios");
const captainModel = require('../models/captain.model');


require('dotenv').config();

function buildTerms(description) {
  const terms = [];
  let offset = 0;

  const parts = description.split(', '); // comma + space se split

  parts.forEach(part => {
    terms.push({
      offset,
      value: part
    });
    offset += part.length + 2; // +2 for ", "
  });

  return terms;
}




module.exports.getDistanceAndTime = async (originCoord, destCoord) => {
  const apiKey = process.env.ORS_API_KEY;

  try {
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

    const body = {
      coordinates: [
        [parseFloat(originCoord.lng), parseFloat(originCoord.lat)],
        [parseFloat(destCoord.lng), parseFloat(destCoord.lat)]
      ]
    };

    //console.log("Origin Coord:", originCoord);
    //console.log("Destination Coord:", destCoord);
    //console.log("Sending coordinates to ORS:", JSON.stringify(body));
    //console.log("ORS API Key:", apiKey);

    const response = await axios.post(url, body, {
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });
    //console.log("ORS Response:", response);

    const route = response.data.routes[0];
    const distanceMeters = route.summary.distance; // meters
    const durationSeconds = route.summary.duration; // seconds

    // ✅ Convert distance to km and round to 2 decimals
    const distanceKm = (distanceMeters / 1000).toFixed(2);
    const durationMin = (durationSeconds / 60).toFixed(1);

    console.log(`Distance: ${distanceKm} km`);
    console.log(`Duration: ${durationMin} mins`);

    return {
      distance: parseFloat(distanceKm),  // return in km
      duration: durationSeconds          // still in seconds if needed for ETA
    };

  } catch (error) {
    console.error('Error in getDistanceAndTime:', error.message);
    throw new Error('Unable to fetch distance and time');
  }
};


module.exports.getAddressCoordinate=async(address)=>{
   
   try{
         const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'vishakameena244@gmail.com'
      }
  });

  //console.log("Response from Nominatim API:", response.data);
    if (response.data.length === 0) {
      throw new Error('No results from Nominatim');
    }

    const { lat, lon } = response.data[0];
    return { lat, lng: lon };
  } catch (err) {
    console.error('Nominatim error:', err.message);
    throw new Error('Unable to fetch coordinates');
  }
}


module.exports.getSuggestions = async (input) => {
  try {
    const response = await axios.get('https://api.openrouteservice.org/geocode/autocomplete', {
      params: {
        text: input,
        api_key: process.env.ORS_API_KEY,
      },
    });

    const suggestions = response.data.features.map(feature => {
      const description = feature.properties.label;
      return {
        display_name: description,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        address: feature.properties.label,
        terms: buildTerms(description)
      };
    });

    return suggestions;

  } catch (err) {
    console.error('ORS Error in getSuggestions:', err.message);
    throw new Error('Unable to fetch suggestions');
  }
};

module.exports.getCaptainInTheRadius= async (ltd, lng, radius) => {

  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6378.1] // radius in kilometers
        }
      }
    });
    return captains;
  } catch (error) {
    console.error('Error fetching captains in radius:', error);
    throw new Error('Unable to fetch captains');
  }
};
