const axios = require("axios");

const appToken = process.env.APP_TOKEN;
const url = `https://data.winnipeg.ca/resource/b85e-mbuw.json?$$app_token=${appToken}`;
const urlBase = process.env.WPA_BASE;

const getWpaPayStationAll = async () => {
  try {
    const resp = await axios.get(url);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

const getWpaPayStationStreet = async (getStreet) => {
  try {
    const resp = await axios.get(urlBase + `street=${getStreet}`, {
      headers: {
        "X-App-Token": appToken,
      },
    });

    // const resp = await axios.get(`https://data.winnipeg.ca/resource/b85e-mbuw.json?`+`street=${getStreet}`+`?$$app_token=${appToken}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

const getWpaPayStationTimeLimit = async (getTimeLimit) => {
  const getTimeLimitFull = getTimeLimit.toString() + " HOUR PARKING";
  try {
    //  const resp = await axios.get(`https://data.winnipeg.ca/resource/b85e-mbuw.json?`+`time_limit=${getTimeLimitFull}`+`?$$app_token=${appToken}`);
    const resp = await axios.get(`${urlBase}time_limit=${getTimeLimitFull}`, {
      headers: {
        "X-App-Token": appToken,
      },
    });

    // const resp = await axios.get(url + `?time_limit=${getTimeLimitFull}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

const getWpaPayStationLocation = async (getLocation) => {
  try {
    const resp = await axios.get(
      urlBase +
        `$where=within_circle(location, ${getLocation.lat}, ${getLocation.lng}, 300)`,
      {
        headers: {
          "X-App-Token": appToken,
        },
      }
    );

    return resp.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWpaPayStationAll,
  getWpaPayStationStreet,
  getWpaPayStationTimeLimit,
  getWpaPayStationLocation,
};
