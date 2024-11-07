import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeSolid } from "@fortawesome/free-solid-svg-icons";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Home from "components/Home/Home";
import ParkingHistory from "components/ParkingHistory/ParkingHistory";
import Profile from "components/Profile/Profile";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import homeIconSolid from "../../images/homeicons/mingcute_home-4-fill.png";
import homeIcon from "../../images/homeicons/mingcute_home-4-fill (1).png";
import clockIconSolid from "../../images/homeicons/fluent_shifts-activity-20-filled.png";
import clockIcon from "../../images/homeicons/fluent_shifts-activity-20-filled (1).png";
import accountIcon from "../../images/homeicons/line-md_account.png";
import accountIconSolid from "../../images/homeicons/line-md_account (1).png";

const Footer = () => {
  //const {} = props;

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
            {({ isActive }) => (
              <>
                {isActive ? <img src={homeIconSolid} className="footer-icon-style"/> : <img src={homeIcon} className="footer-icon-style"/>}
              </>
            )}
          </NavLink>
          <span>Home</span>
        </div>
        <div className="footer-item">
          <NavLink to="/parkinghistory">
            {({ isActive }) => (
              <>
                {isActive ? <img src={clockIcon} className="footer-icon-style"/> : <img src={clockIconSolid} className="footer-icon-style"/>}
              </>
            )}
          </NavLink>
          <span>Activity</span>
        </div>
        <div className="footer-item">
          <NavLink to="/profile">
            {({ isActive }) => (
              <>
                {isActive ? <img src={accountIconSolid} className="footer-icon-style"/> : <img src={accountIcon} className="footer-icon-style"/>}
              </>
            )}
          </NavLink>
          <span>Account</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
