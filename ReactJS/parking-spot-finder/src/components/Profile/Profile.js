import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import ParkingHistory from "../ParkingHistory/ParkingHistory.js";
import {
  getUserProfileData,
  saveUserProfileData,
} from "services/userProfileDataService";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userExist, setUserExist] = useState(false);
  let btnCompReg;

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
  }, [userExist]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.given_name} />
            <h2>Name: {user.name}</h2>
            <h2>Last name{user.family_name}</h2>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
      <div>
        {userExist ? (
          <div></div>
        ) : (
          <button onClick={() => handleCompReg} type="Submit">
            Complete Registeration
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;
