const getWpaService = require("../services/wpaService");

// get all wpa dapa
const fetchWpaApiData = async (req, res) => {
  try {
    const getData = await getWpaService.getWpaPayStationAll();

    res.json(getData);
  } catch (error) {
    console.error("Error in wpaController:", error);
    res.status(500).json({
      message: "Failed to fetch data from wpa api",
    });
  }
};

// get wpa streets data
const fetchWpaApiStreet = async (req, res) => {
  try {
    // convert to an object

    const reqTextAdd = req.body.address;

    const getData = await getWpaService.getWpaPayStationStreet(reqTextAdd);

    res.json(getData);
  } catch (error) {
    console.error("Error in wpaController:", error);
    res.status(500).json({
      message: "Failed to fetch data from wpa api (street)",
    });
  }
};

const fetchWpaApiTimeLimit = async (req, res) => {
  try {
    // convert to an object
    const reqTimeLimit = req.body.time_limit;

    const getData = await getWpaService.getWpaPayStationTimeLimit(reqTimeLimit);

    res.json(getData);
  } catch (error) {
    console.error("Error in wpaController:", error);
    res.status(500).json({
      message: "Failed to fetch data from wpa api (time_limit)",
    });
  }
};
const fetchWpaApiLocation = async (req, res) => {
  try {
    // convert to an object
    const reqLocation = {
      lat: req.body.latitude,
      lng: req.body.longitude,
    };

    const getData = await getWpaService.getWpaPayStationLocation(reqLocation);

    res.json(getData);
  } catch (error) {
    console.error("Error in wpaController Fetch by location:", error);
    res.status(500).json({
      message: "Failed to fetch data from wpa api (location)",
    });
  }
};
module.exports = {
  fetchWpaApiData,
  fetchWpaApiStreet,
  fetchWpaApiTimeLimit,
  fetchWpaApiLocation,
};
