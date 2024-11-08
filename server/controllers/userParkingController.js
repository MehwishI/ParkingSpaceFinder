const userParkingService = require("../services/userParkingService");
const { getDecryptedData, getEncrytedData } = require("../services/encryptService");

const fetchUserParkingData = async (req, res) => {
  try {
    const parkHistory = await userParkingService.getUserParkingHistory(
      req.body.userid
    );
    if (!parkHistory) {
      res.status(404).send("Parking history not available for this user.");
    } else {
      return res.status(200).send(parkHistory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const saveUserParkingData = async (req, res) => {
  // start decrypt data
  const getDecryptData = getDecryptedData(req.body);

  const userid = getDecryptData.userid;

  const parkData = {
    paystation_number: getDecryptData.paystation_number,
    restriction: getDecryptData.restriction,
    time_limit: getDecryptData.time_limit,
    street: getDecryptData.street,
    total_space: getDecryptData.total_space,
    accessible_space: getDecryptData.accessible_space,
    hourly_rate: getDecryptData.hourly_rate,
    mobile_pay_zone: getDecryptData.mobile_pay_zone,
    latitude: getDecryptData.latitude,
    longitude: getDecryptData.longitude,
    parking_date: Date.now(),
  };
  try {
    const savedHistory = await userParkingService.saveUserParkingHistory(
      parkData,
      userid
    );
    if (savedHistory) {
      return res.status(200).send("History saved successfully!");
    } else res.status(500).send("User Parking History not saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchUserParkingData, saveUserParkingData };
