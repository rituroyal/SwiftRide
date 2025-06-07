const { default: axios } = require("axios");


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
    // OpenRouteService Directions API URL
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

    // Construct the body for POST request
    const body = {
      coordinates: [
        [parseFloat(originCoord.lng), parseFloat(originCoord.lat)],
        [parseFloat(destCoord.lng), parseFloat(destCoord.lat)]
      ]
    };

    console.log("Origin Coord:", originCoord);
console.log("Destination Coord:", destCoord);
console.log("Sending coordinates to ORS:", JSON.stringify(body));


    const response = await axios.post(url, body, {
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });

    // Response data me routes array hota hai, usme distance and duration milega
    const route = response.data.routes[0];
    const distanceMeters = route.summary.distance; // meters
    const durationSeconds = route.summary.duration; // seconds

    return {
      distance: distanceMeters, // meter me distance
      duration: durationSeconds // seconds me time
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

  console.log("Response from Nominatim API:", response.data);
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

