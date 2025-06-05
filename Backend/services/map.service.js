const { default: axios } = require("axios");

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