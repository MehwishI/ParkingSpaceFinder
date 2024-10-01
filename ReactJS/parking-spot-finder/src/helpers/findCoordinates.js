import React from "react"
const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const axios = require('axios');

 const findCoordinatesByAddress = async (address) => {

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`);
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { findCoordinatesByAddress };