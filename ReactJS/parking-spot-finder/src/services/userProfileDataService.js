import axios from "axios";
const localBaseUrl = process.env.REACT_APP_BASE_URL_API;

const getUserProfileData = async (getUserId) => {
  const userid = getUserId;

  try {
    const response = await axios.post(`${localBaseUrl}/user/profile`, {
      userid: userid,
    });
    console.log(response.data);
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
    console.log("response in UserProfileDataService:", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getUserProfileData, saveUserProfileData };
