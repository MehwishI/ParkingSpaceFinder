const userCollection = require("../models/User");

//get user data from db
//call encrypt data() --sensitive data
const getUserData = async (userId) => {
  try {
    
    const userFound = await userCollection
      .findOne({
        userid: userId,
      })
      .exec();

    if (!userFound) {
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
  try {
    
    const newUser = new userCollection(userData);

    newUser
      .save()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUserData, saveUserData };
