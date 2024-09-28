const getWpaService = require('../services/wpaService');

// get all wpa dapa
const fetchWpaApiData = async (req, res) => {
    try {
        const getData = await getWpaService.getWpaPayStationAll();

        res.json(getData);

    } catch (error) {
        console.error('Error in wpaController:', error);
        res.status(500).json({
            message: 'Failed to fetch data from wpa api'
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
        console.error('Error in wpaController:', error);
        res.status(500).json({
            message: 'Failed to fetch data from wpa api (street)'
        });
    }
};

module.exports = {
    fetchWpaApiData,
    fetchWpaApiStreet
};