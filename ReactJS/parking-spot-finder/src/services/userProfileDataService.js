import axios from "axios";
import { getEncryptedData, getDecryptedData } from "./encryptdecrypt";
const localBaseUrl = process.env.REACT_APP_BASE_URL_API;

const getUserProfileData = async (getUserId) => {
  const userid = getUserId;

  try {
    // encrypt data before sending to database
    const encryptUserData = getEncryptedData(userid);
    console.log("gggppp", encryptUserData);

    const response = await axios.post(`${localBaseUrl}/user/profile`, {
      userid: encryptUserData,
    });
    // const response = await axios.post(`${localBaseUrl}/user/profile`, {
    //   userid: userid,
    // });

    console.log("gggvvv", response);
    // decrypt incoming data
    const decryptedData = getDecryptedData(response.data);
    console.log("ggg encrypt t", decryptedData);
    

    return decryptedData;
    // return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const saveUserProfileData = async (userData) => {
  console.log("userData in react service:", userData);
  try {

    // encrypt data before sending to database
    const encryptUserData = getEncryptedData(userData);

    console.log("encry", encryptUserData);
    
    // const response = await axios.post(`${localBaseUrl}/user/profile/save`, {
    //   userData,
    // });
    const response = await axios.post(`${localBaseUrl}/user/profile/save`, {
      encryptUserData,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserProfileData, saveUserProfileData };
