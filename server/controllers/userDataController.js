const userService = require("../services/userDataService");

const fetchUserData = async (req, res) => {
  const userid = req.body.userid;
  try {
    const user = await userService.getUserData(userid);
    if (!user) {
      res.status(404).send(false);
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const saveUserData = async (req, res) => {
  const userData = req.body.userData;

  const userExist = await userService.getUserData(req.body.userData.userid);

  if (!userExist) {
    try {
      const data = await userService.saveUserData(req.body.userData);
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
