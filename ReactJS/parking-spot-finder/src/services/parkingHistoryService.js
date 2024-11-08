//get parking history from userid

import axios from "axios";
import { getEncryptedData, getDecryptedData } from "./encryptdecrypt";
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
    // encrypt parking history
    const encryptParkingHistoryData = getEncryptedData(parkData);

    const response = await axios.post(`${localBaseUrl}/user/parking/save`, {
      encryptParkingHistoryData,
    });
    return response.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserParkingHistory, saveUserParkingHistory };
