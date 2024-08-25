const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function getCoordsForAddress(address) {
  // Mocked coordinates for the purpose of this example. Key not purchased from the server
  
  // coimbatore coordinates
  return {
    lat: 11.0168,
    lng: 76.9558
  };

  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     address
  //   )}&key=${API_KEY}`
  // );

  // const data = response.data;

  // if (!data || data.status === 'ZERO_RESULTS') {
  //   const error = new HttpError(
  //     'Could not find location for the specified address.',
  //     422
  //   );
  //   throw error;
  // }

  // const coordinates = data.results[0].geometry.location;

  // return coordinates;
}

module.exports = getCoordsForAddress;
