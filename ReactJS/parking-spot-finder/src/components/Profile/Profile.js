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
import { faL } from "@fortawesome/free-solid-svg-icons";
import usericon from "../../images/user.png";
import notifIcon from "../../images/Left item.png";
import settingsIcon from "../../images/settings.png";
import phoneIcon from "../../images/f7_phone.png";
import terms from "../../images/proicons_document.png";
import logoutIcon from "../../images/logout.png";
import line from "../../images/Line 26.png";
import arrow from "../../images/Back.png";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [userExist, setUserExist] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
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
        setUserSaved(true);
      }
    } catch (error) {
      console.log("User not saved:", error);
    }
  };

  const onLoginClick = () => {
    return <Login />;
  };
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("user:", user);
      try {
        if (isAuthenticated) {
          const userFound = await getUserProfileData(user.sub);
          console.log("found", userFound);
          if (userFound.status === 200) {
            setUserExist(true);
          } else setUserExist(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userExist === false) {
      setShowReg(true);
    } else {
      setShowReg(false);
      console.log("user:", user);
    }
  }, [userExist]);

  useEffect(() => {
    if (userSaved) {
      setShowReg(false);
    }
  }, [userSaved]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="account">Account</div>
      <div className="profile-container">
        <div>
          {!isAuthenticated && (
            <div>
              <NavLink to="/login">Login here!</NavLink>
            </div>
          )}
          {isAuthenticated && (
            <div>
              <div className="name-container">
                <img
                  src={usericon}
                  alt={user.picture}
                  style={{ width: "50px", height: "50px" }}
                ></img>
                <div className="name-btn">
                  <div className="name">
                    {user.name} {""}
                    {user.family_name}
                  </div>
                  <div>
                    {" "}
                    {isAuthenticated
                      ? showReg && (
                          <button className="comp-btn" onClick={handleCompReg}>
                            {/* <i class="fa fa-user-plus" aria-hidden="true"></i> */}
                            Complete Registeration
                          </button>
                        )
                      : ""}
                  </div>
                </div>
              </div>
              <div className="general-cont">
                <div className="general">General</div>
                <img src={line} alt=""></img>
                <div className="text-cont">
                  <img src={notifIcon} alt=""></img>
                  <div className="text">Notifications</div>
                  <img src={arrow} alt="" className="arrow-icon"></img>
                </div>
                <div className="text-cont">
                  <img src={settingsIcon} alt=""></img>
                  <div className="text">Settings</div>
                  <img src={arrow} alt="" className="arrow-icon"></img>
                </div>
              </div>

              <div className="support-cont">
                <div className="general">Support</div>
                <img src={line} alt=""></img>
                <div className="text-cont">
                  <img src={phoneIcon} alt=""></img>
                  <div className="text">Contact Us</div>
                  <img src={arrow} alt="" className="arrow-icon"></img>
                </div>
              </div>
              <div className="terms-cont">
                <div className="general">Terms of Use</div>
                <img src={line} alt=""></img>
                <div className="text-cont">
                  <img src={terms} alt=""></img>
                  <div className="text">Terms and Conditions</div>
                  <img src={arrow} alt="" className="arrow-icon"></img>
                </div>
              </div>
              {isAuthenticated && (
                <div className="logout-cont">
                  {" "}
                  <div className="general">Logout</div>
                  <img src={line} alt=""></img>
                  <div className="text-cont" onClick={handleLogout}>
                    <img src={logoutIcon} alt=""></img>
                    <div className="text-logout">Logout</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* <div className="name-img-container">
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
        </div> */}

          {/* {isAuthenticated
            ? showReg && (
                <button onClick={handleCompReg} type="Submit">
                  Complete Registeration
                </button>
              )
            : ""} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
