const axios = require("axios");

const gglBaseUrl = process.env.GOOGLE_API_BASE_URL;
const gglApiKey = process.env.GOOGLE_MAPS_API_KEY;

const getGoogSearchResult = async (getInput) => {
  try {
    // console.log("google input", getInput);

    const getRes = await axios.get(
      `${gglBaseUrl}/place/autocomplete/json?input=${encodeURIComponent(
        getInput.address
      )}&key=${gglApiKey}`
    );
    console.log("returned", getRes);

    return getRes.data; //get place ID
  } catch (error) {
    throw error;
  }
};

const getCoordinatesByPlaceId = async (placeid) => {
  try {
    const response = await axios.get(
      `${gglBaseUrl}/place/details/json?place_id=${placeid}&key=${gglApiKey}`
    );
    console.log(response.data.result.geometry.location);
    return response.data.result.geometry.location; // returning cooridinates in the form for e.g: { lat: 49.88412429999999, lng: -97.1989378 }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getGoogSearchResult,
  getCoordinatesByPlaceId,
};
