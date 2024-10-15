import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import Home from "components/Home/Home";
import ParkingHistory from "components/ParkingHistory/ParkingHistory";
import Profile from "components/Profile/Profile";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = (props) => {
  const {
    isHome,
    setisHome,
    isHistory,
    setisHistory,
    isProfile,
    setisProfile,
  } = props;

  const onHistoryClick = () => {
    setisHistory(true);
    setisHome(false);
    setisProfile(false);
  };
  const onProfileClick = () => {
    setisHistory(false);
    setisHome(false);
    setisProfile(true);
  };
  const onHomeClick = () => {
    setisHistory(false);
    setisHome(true);
    setisProfile(false);
  };
  return (
    <>
      <div className="footer">
        <div className="footer-item">
          <NavLink to="/" onClick={() => onHomeClick()}>
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
        </div>
        <div className="footer-item">
          <NavLink to="/parkinghistory" onClick={() => onHistoryClick()}>
            <FontAwesomeIcon icon={faList} />
          </NavLink>
        </div>
        <div className="footer-item">
          <NavLink to="/profile" onClick={() => onProfileClick()}>
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Footer;
