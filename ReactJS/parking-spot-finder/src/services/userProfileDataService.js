import axios from "axios";
const localBaseUrl = process.env.REACT_APP_BASE_URL_API;

const getUserProfileData = async (getUserId) => {
  const userid = getUserId;

  try {
    const response = await axios.post(`${localBaseUrl}/user/profile`, {
      userid: userid,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const saveUserProfileData = async (userData) => {
  try {
    const response = await axios.post(`${localBaseUrl}/user/profile/save`, {
      userData,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserProfileData, saveUserProfileData };
