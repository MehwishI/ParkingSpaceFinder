import axios from "axios";

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const getGoogleCoordinates = async (getplaceid) => {
  try {
    const getCoordinates = await axios.post(`${getBaseApi}/googlecoordinates`, {
      placeid: getplaceid,
    });
    return getCoordinates.data;
  } catch (error) {
    return error;
  }
};

const getRealAddress = async (getCoords) => {
  const payload = {
    latitude: parseFloat(getCoords.lat),
    longitude: parseFloat(getCoords.lng),
  };

  try {
    const getRealAddress = await axios.post(
      `${getBaseApi}/googleaddress`,
      payload
    );

    return getRealAddress.data;
  } catch (error) {
    throw error;
  }
};

export { getGoogleCoordinates, getRealAddress };
