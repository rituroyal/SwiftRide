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
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
              q: input,
              format: 'json',
              addressdetails: 1,
              limit: 10,
              countrycodes: 'in',
              polygon_geojson: 0
          },
          headers: {
              'User-Agent': 'vishakameena244@gmail.com'
          }
      });

      const allowedTypes = new Set([
          'city', 'town', 'village', 'suburb', 'residential',
          'commercial', 'road', 'neighbourhood', 'locality',
          'hamlet', 'poi'
      ]);

      const filteredSuggestions = response.data.filter(place =>
          allowedTypes.has(place.type)
      );

      const suggestions = filteredSuggestions.map(place => {
          const description = place.display_name;
          return {
              display_name: description,
              lat: place.lat,
              lng: place.lon,
              type: place.type,
              class: place.class,
              address: place.address,
              terms: buildTerms(description)
          };
      });

      return suggestions;

  } catch (err) {
      console.error('Error in getSuggestions:', err.message);
      throw new Error('Unable to fetch suggestions');
  }
};
