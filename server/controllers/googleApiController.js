const getGglService = require("../services/googleApiService");

const fetchAutocompleteGgl = async (req, res) => {
  try {
    const getData = await getGglService.getGoogSearchResult(req.body);

    res.json(getData);
  } catch (error) {
    console.error("Error in googleApiController:", error);
    res.status(500).json({
      message: "Failed to fetch data from google api",
    });
  }
};

const fetchCoordinatesbyPlaceId = async (req, res) => {
  try {
    const getData = await getGglService.getCoordinatesByPlaceId(
      req.body.placeid
    );

    res.json(getData);
  } catch (error) {
    console.error(
      "Error in googleApiController (fetchCoordinatesbyPlaceId):",
      error
    );
    res.status(500).json({
      message: "Failed to fetch coordinates data from google api",
    });
  }
};

const fetchAddressText = async (req, res) => {
  console.log("aaa:", req.body);
  try {
    const getAddressData = await getGglService.getAddressTextByCoord(req.body);

    res.json(getAddressData);
  } catch (error) {
    console.error(
      "Error in googleApiController (When fetching address):",
      error
    );
    res.status(500).json({
      message: "Failed to fetch address data from google api",
    });
  }
};

module.exports = {
  fetchAutocompleteGgl,
  fetchCoordinatesbyPlaceId,
  fetchAddressText,
};
