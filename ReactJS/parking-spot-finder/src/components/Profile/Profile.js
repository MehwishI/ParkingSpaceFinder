import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
//import ParkingHistory from "../ParkingHistory/ParkingHistory.js";
import {
  getUserProfileData,
  saveUserProfileData,
} from "services/userProfileDataService";
import Login from "components/Authentication/Login";
import Logout from "components/Authentication/Logout";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userExist, setUserExist] = useState(false);
  //let btnCompReg;

  //save user data into db

  const handleCompReg = async () => {
    const userData = {
      userid: user.sub,
      userFirstName: user.given_name ? user.given_name : user.email,
      userLastName: user.family_name,
      userEmail: user.email,
      emailVerified: user.email_verified,
    };

    try {
      const response = await saveUserProfileData(userData);
      if (response.status === 200) {
        console.log("user saved Successfully!");
      }
    } catch (error) {
      console.log("User not saved:", error);
    }
  };

  const onLoginClick = () => {
    return <Login />;
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user.isAuthenticated) {
          const userFound = await getUserProfileData(user.sub);
          if (userFound) {
            setUserExist(true);
          } else setUserExist(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h3>Account</h3>
      <div className="profile-container">
        <div>
          {!isAuthenticated && (
            <div>
              <NavLink to="/login">Login here!</NavLink>
            </div>
          )}
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
          {isAuthenticated && userExist && (
            <button onClick={handleCompReg} type="Submit">
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
