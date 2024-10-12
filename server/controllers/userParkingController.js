const userParkingService = require("../services/userParkingService");

const fetchUserParkingData = async (req, res) => {
  try {
    const parkHistory = await userParkingService.getUserParkingHistory(
      req.body.userid
    );
    console.log(parkHistory);
    if (!parkHistory) {
      console.log("Parking history not found for this user.");
      res.status(404).send("Parking history not available for this user.");
    }
    return res.status(200).send(parkHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const saveUserParkingData = async (req, res) => {
  const userid = req.body.userid;

  const parkData = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: Date.now(),
  };
  try {
    const savedHistory = await userParkingService.saveUserParkingHistory(
      parkData,
      userid
    );
    console.log("savedHistory:", savedHistory);
    if (savedHistory) {
      return res.status(200).send("History saved successfully!");
    } else res.status(500).send("User Parking History not saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchUserParkingData, saveUserParkingData };
