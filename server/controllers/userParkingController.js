const userParkingService = require("../services/userParkingService");

const fetchUserParkingData = async (req, res) => {
  try {
    console.log("request data", req.body.userid);

    const parkHistory = await userParkingService.getUserParkingHistory(
      req.body.userid
    );
    console.log(parkHistory);
    if (!parkHistory) {
      console.log("Parking history not found for this user.");
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
  const userid = req.body.userid;

  const parkData = {
    paystation_number: req.body.paystation_number,
    restriction: req.body.restriction,
    time_limit: req.body.time_limit,
    street: req.body.street,
    total_space: req.body.total_space,
    accessible_space: req.body.accessible_space,
    hourly_rate: req.body.hourly_rate,
    mobile_pay_zone: req.body.mobile_pay_zone,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    parking_date: Date.now(),
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
