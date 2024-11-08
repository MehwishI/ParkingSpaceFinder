const userService = require("../services/userDataService");
const { getDecryptedData, getEncrytedData } = require("../services/encryptService");

const fetchUserData = async (req, res) => {
  const userid = req.body.userid;
  try {
    // start decrypt data
    const getDecryptData = getDecryptedData(userid);

    const user = await userService.getUserData(getDecryptData);
    // const user = await userService.getUserData(userid);

    // encrypt data before passing back to frontend
    const getEncryptRes = getEncrytedData(user);

    if (!user) {
      res.status(404).send(false);
    } else {
      // res.status(200).send(user);
      res.status(200).send(getEncryptRes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const saveUserData = async (req, res) => {
  // start decrypt data
  const getDecryptData = getDecryptedData(req.body.encryptUserData);

  // const userData = req.body.userData;

  const userExist = await userService.getUserData(getDecryptData.userid);
  // const userExist = await userService.getUserData(req.body.userData.userid);

  if (!userExist) {
    try {
      const data = await userService.saveUserData(getDecryptData.userData);
      if (data) {
        res.status(200).send("User data saved!");
      } else {
        res.status(404).send("User data not saved!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server error! Failed to  save user data",
      });
    }
  } else {
    console.log(
      "Userid and email exists already. Please try again with a different email"
    );

    res.status(500).send({
      message:
        "Userid and email exists already. Please try again with a different email",
    });
  }
};

module.exports = { fetchUserData, saveUserData };
