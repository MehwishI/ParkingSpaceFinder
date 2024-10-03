const getGglService = require('../services/googleApiService');

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

module.exports = {
    fetchAutocompleteGgl
};