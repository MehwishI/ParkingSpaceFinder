import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Home from "components/Home/Home";
import ParkingHistory from "components/ParkingHistory/ParkingHistory";
import Profile from "components/Profile/Profile";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {
  //const {} = props;
  const { user, isAuthenticated, isLoading } = useAuth0();

  // const onHistoryClick = () => {
  //   setisHistory(true);
  //   setisHome(false);
  //   setisProfile(false);
  // };
  // const onProfileClick = () => {
  //   setisHistory(false);
  //   setisHome(false);
  //   setisProfile(true);
  // };
  // const onHomeClick = () => {
  //   setisHistory(false);
  //   setisHome(true);
  //   setisProfile(false);
  // };
  return (
    <>
      <div className="footer">
        <div className="footer-item">
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
          <span>Home</span>
        </div>
        <div className="footer-item">
          <NavLink to="/parkinghistory">
            <FontAwesomeIcon icon={faClock} />
          </NavLink>
          <span>Activity</span>
        </div>
        <div className="footer-item">
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>

          <span>Account</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
