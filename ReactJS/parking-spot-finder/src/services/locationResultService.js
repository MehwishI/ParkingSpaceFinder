import axios from "axios";

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const locResultSearch = async () => {

  try {
    const getLocRes = await axios.post(`${getBaseApi}/wpatimelimit`);

    return getLocRes.data;
  } catch (error) {
    console.error("Error getting location result", error);
    return error;
  }
};

const locAllResultSearch = async () => {
  try {
    const getAllLocRes = await axios.get(`${getBaseApi}/wpapaystation`);

    return getAllLocRes.data;
  } catch (error) {
    console.error("Error getting location result", error);
    return error;
  }
};

const locResultForCoord = async (coordPoints) => {
  const getLocCoRes = await axios.post(`${getBaseApi}/wpalocation`, {
    latitude: String(coordPoints.lat),
    longitude: String(coordPoints.lng),
  });

  return getLocCoRes.data;
};

export { locResultSearch, locAllResultSearch, locResultForCoord };
