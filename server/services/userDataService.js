const userCollection = require("../models/User");

//get user data from db
//call encrypt data() --sensitive data
const getUserData = async (userId) => {
  try {
  
    console.log("user data id",userId);
    
    const userFound = await userCollection
      .findOne({
        userid: userId,
      })
      .exec();

    // console.log("UserFound returned in service", userFound);
    if (!userFound) {
      console.log("User not found");
      return null;
    }
    return userFound;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// post user data to db
//call encrypt data() --sensitive data
const saveUserData = async (userData) => {
  // console.log("userData in service:", userData);

  try {
    const newUser = new userCollection(userData);
    const savedUser = await newUser.save();
    console.log("User saved: ", savedUser);
    // if(writeResult.hasWriteError())
    return savedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUserData, saveUserData };
