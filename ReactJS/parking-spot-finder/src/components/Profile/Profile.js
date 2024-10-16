import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import ParkingHistory from "../ParkingHistory/ParkingHistory.js";
import {
  getUserProfileData,
  saveUserProfileData,
} from "services/userProfileDataService";
import Login from "components/Authentication/Login";
import Logout from "components/Authentication/Logout";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userExist, setUserExist] = useState(false);
  //let btnCompReg;

  //save user data into db

  const handleCompReg = async () => {
    const userData = {
      userid: user.sub,
      firstname: user.given_name,
      lastname: user.family_name,
      email: user.email,
      emailVerified: user.email_verified,
    };
    const response = await saveUserProfileData(userData);
    if (response.ok) {
      console.log("user saved Successfully!");
    }
  };
  const fetchUserData = async () => {
    const userFound = await getUserProfileData(user.sub);
    if (userFound) {
      setUserExist(true);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h3>Account</h3>
      <div className="profile-container">
        <div>
          {isAuthenticated && (
            <div>
              <div className="name-img-container">
                <img src={user.picture} alt={user.given_name} />
                <h3>{user.name}</h3>
                <h3>
                  {""}
                  {user.family_name}
                </h3>
              </div>
              <div className="profile-details">
                <p>Email: {user.email}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          {userExist ? (
            ""
          ) : (
            <button onClick={() => handleCompReg} type="Submit">
              Complete Registeration
            </button>
          )}
          {isAuthenticated && <Logout />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
