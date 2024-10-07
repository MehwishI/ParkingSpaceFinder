const userParkingData = require("../models/UserParking");

//get user parking data from db
//call encrypt data()

const getUserParkingHistory = async (userId) => {
  //get from db
  try {
    const parkdata = await userParkingData
      .find(
        {
          userid: userId,
        },
        parkhistory
      )
      .exec();

    return parkhistory;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// incomplete
//post user parking data to db
//call encrypt data()
const saveUserParkingHistory = async (req, res) => {
  //save to db to the same user id

  try {
    const newParkItem = new userParkingData(req.body);
    const savedItem = await newParkItem.save();
    console.log(savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getUserParkingHistory, saveUserParkingHistory };
