//import axios from "axios";
const userService = require("../services/userDataService");

const fetchUserData = async (req, res) => {
  const userid = req.body.userid;
  try {
    const result = await userService.getUserData(userid);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const saveUserData = async (req, res) => {
  console.log("reached user data controller");
  console.log("req.body in controller:", req.body);
  const userData = {
    userid: req.body.userid,
    userFirstName: req.body.firstname,
    userLastName: req.body.lastname,
    userEmail: req.body.email,
  };
  try {
    const data = await userService.saveUserData(userData);
    console.log("data returned", data);
    if (data) {
      res.status(200).send("User data saved!");
    } else {
      res.status(500).send("User data not saved!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to  save user data",
    });
  }
};

module.exports = { fetchUserData, saveUserData };