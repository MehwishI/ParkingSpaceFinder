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
    console.log(getStreet)
    try {
        const resp = await axios.get(urlBase + `street=${getStreet}`,
            {
                headers: {
                    'X-App-Token': appToken
                }
            }
        );
      
        // const resp = await axios.get(`https://data.winnipeg.ca/resource/b85e-mbuw.json?`+`street=${getStreet}`+`?$$app_token=${appToken}`);

        return resp.data;
    } catch (error) {
        console.log('Error in ApiService:', error);
        throw error;
    }
};

const getWpaPayStationTimeLimit = async (getTimeLimit) => {
    console.log('time limit',getTimeLimit)
    const getTimeLimitFull = getTimeLimit.toString() + ' HOUR PARKING';
    console.log(getTimeLimitFull)
    try {
        // const resp = await axios.get(`https://data.winnipeg.ca/resource/b85e-mbuw.json?`+`time_limit=${getTimeLimitFull}`+`?$$app_token=${appToken}`);
        const resp = await axios.get(`${urlBase}time_limit=${getTimeLimitFull}`, {
            headers: {
                'X-App-Token': appToken
            }
        });

       // const resp = await axios.get(url + `?time_limit=${getTimeLimitFull}`);

        return resp.data;
    } catch (error) {
        console.log('Error in ApiService:', error);
        throw error;
    }
};

const getWpaPayStationLocation = async (getLocation) => {
   // const getTimeLimitFull = getTimeLimit.toString() + 'HOUR PARKING';
    try {
        const resp = await axios.get(urlBase + `location=${getLocation}`,
            {
                headers: {
                    'X-App-Token': appToken
                }
            });

        return resp.data;
    } catch (error) {
        console.log('Error in ApiService:', error);
        throw error;
    }
};

module.exports = {
    getWpaPayStationAll,
    getWpaPayStationStreet,
    getWpaPayStationTimeLimit,
    getWpaPayStationLocation
};