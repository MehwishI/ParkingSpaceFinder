const axios = require('axios');

const gglBaseUrl = process.env.GOOGLE_API_BASE_URL;
const gglApiKey = process.env.GOOGLE_MAPS_API_KEY;

const getGoogSearchResult = async (getInput) => {
    try {
        console.log("google input", getInput);
        
        const getRes = await axios.get(`${gglBaseUrl}/place/autocomplete/json?input=${encodeURIComponent(getInput.address)}&key=${gglApiKey}`);
        console.log("returned",getRes);
        
        return getRes.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getGoogSearchResult
};



