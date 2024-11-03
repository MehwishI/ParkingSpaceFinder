import axios from "axios";

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const getGoogleCoordinates = async (getplaceid) => {
  console.log("getplaceid in service:", getplaceid);
  try {
    const getCoordinates = await axios.post(`${getBaseApi}/googlecoordinates`, {
      placeid: getplaceid,
    });
    // console.log("getcoordinates:", getCoordinates.data);
    //const getCoordinates = await response.json();
    console.log("getCoordinates.data:", getCoordinates.data);
    return getCoordinates.data;
  } catch (error) {
    return error;
  }
};

const getRealAddress = async (getCoords) => {
  // console.log("getCoords in service:", getCoords);
  const payload = {
    latitude: parseFloat(getCoords.lat),
    longitude: parseFloat(getCoords.lng),
  };

  console.log(payload);
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
