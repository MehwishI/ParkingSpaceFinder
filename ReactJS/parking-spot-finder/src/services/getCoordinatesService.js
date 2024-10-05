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

export { getGoogleCoordinates };
