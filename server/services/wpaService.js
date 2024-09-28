const axios = require('axios');

const appToken = process.env.APP_TOKEN;
const url = `https://data.winnipeg.ca/resource/b85e-mbuw.json?$$app_token=${appToken}`;
const urlBase = process.env.WPA_BASE;

const getWpaPayStationAll = async () => {
    try {
        const resp = await axios.get(url);

        return resp.data;
    } catch (error) {
        console.log('Error in ApiService:', error);
        throw error;
    }
};

const getWpaPayStationStreet = async (getStreet) => {
    try {
        const resp = await axios.get(urlBase + `street=${getStreet}`);

        return resp.data;
    } catch (error) {
        console.log('Error in ApiService:', error);
        throw error;
    }
};

module.exports = {
    getWpaPayStationAll,
    getWpaPayStationStreet
};