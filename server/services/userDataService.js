const userCollection = require("../models/User.js");

//import axios from "axios";

//get user data from db
//call encrypt data() --sensitive data
const getUserData = async (userId) => {
  try {
    const parkdata = await userCollection
      .find(
        {
          userid: userId,
        },
        userProfile
      )
      .exec();
    return userProfile;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// post user data to db
//call encrypt data() --sensitive data
const saveUserData = async (userData) => {
  console.log("userData in service:", userData);
  console.log("reached user data service");
  try {
    const newUser = new userCollection(userData);
    const savedUser = await newUser.save();
    console.log("User saved: ", savedUser);
    return savedUser;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUserData, saveUserData };
