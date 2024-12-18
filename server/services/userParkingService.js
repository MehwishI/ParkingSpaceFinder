const userParkingModel = require("../models/UserParking");
let userModel = require("../models/User");
const userService = require("./userDataService");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("User");

//get user parking data from db
//call encrypt data()

const getUserParkingHistory = async (userId) => {

  let userfound = {};
  try {
    userFound = await userService.getUserData(userId);

    if (userFound) {
      //console.log("userFound in parking service", userFound);
      if (userFound.emailVerified === false) {
        console.log(
          "Email not verified, please verify your email to view parking history. "
        );
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const parkHistory = await userParkingModel
      .find({
        //
        user: userFound._id,
      })
      .exec();

    if (!parkHistory) {
      return null;
    } else return parkHistory;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//post user parking data to db
//call encrypt data()
const saveUserParkingHistory = async (parkData, userId) => {
  //find the user with the given userid

  let userFound = null;

  try {
    userFound = await userModel
      .findOne({
        userid: userId,
      })
      .exec();
    if (!userFound) {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  try {
    //create new instance of parking model
    const newParkItem = new userParkingModel();
    newParkItem.locLatitude = parkData.latitude;
    newParkItem.locLongitude = parkData.longitude;
    newParkItem.user = userFound._id;
    newParkItem.paystation_number = parkData.paystation_number;
    newParkItem.restriction = parkData.restriction;
    newParkItem.time_limit = parkData.time_limit;
    newParkItem.street = parkData.street;
    newParkItem.total_space = parkData.total_space;
    newParkItem.accessible_space = parkData.accessible_space;
    newParkItem.hourly_rate = parkData.hourly_rate;
    newParkItem.mobile_pay_zone = parkData.mobile_pay_zone;

    const savedItem = await newParkItem.save();

    //update userFound
    userFound.parkHistory.push(newParkItem._id);
    userFound.save();
    
    // res.status(201).json(savedItem);
    return userFound;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = { getUserParkingHistory, saveUserParkingHistory };
