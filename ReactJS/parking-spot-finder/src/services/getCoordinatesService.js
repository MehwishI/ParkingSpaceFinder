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
  const payload = {
    latitude: getCoords.lat,
    longitude: getCoords.lng,
    
  };

  console.log(payload)
  try {
    const getRealAddress = await axios.post(
      `${getBaseApi}/googleaddress`,
      payload
    );

    console.log("real address", getRealAddress.data);
    return getRealAddress.data;
  } catch (error) {
    throw error;
  }
};

export { getGoogleCoordinates, getRealAddress };
