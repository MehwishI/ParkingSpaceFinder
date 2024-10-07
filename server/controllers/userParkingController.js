//import axios from "axios";

const userParkingService = require("../services/userParkingService");

const fetchUserParkingData = async (req, res) => {
  try {
    const result = await userParkingService.getUserParkingHistory();
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const saveUserParkingData = async (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  try {
    const response = await userParkingService.saveUserParkingHistory(
      userid,
      userName,
      userEmail,
      latitude,
      longitude
    );

    console.log(response.status);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchUserParkingData, saveUserParkingData };
