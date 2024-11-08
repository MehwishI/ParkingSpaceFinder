//get parking history from userid

import axios from "axios";
const localBaseUrl = process.env.REACT_APP_BASE_URL_API;

const getUserParkingHistory = async (getUserId) => {
  const userid = getUserId;

  try {
    const response = await axios.post(`${localBaseUrl}/user/parking`, {
      userid: userid,
    });
    console.log("response in service", response);
    if (response.status === 404) {
      return false;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

//save park history

const saveUserParkingHistory = async (parkData) => {
  try {
    const response = await axios.post(`${localBaseUrl}/user/parking/save`, {
      parkData,
    });
    return response.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserParkingHistory, saveUserParkingHistory };
