import { NavLink } from "react-router-dom";
import React from "react";
import "./TopNavigationBar.css";

import { useAuth0 } from "@auth0/auth0-react";

const TopNavigationBar = () => {
  //get userid
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="nav-container">
      <div className="title-logo">SmartPark</div>

      <div className="top-nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/parkinghistory" className="nav-link">
          Activity
        </NavLink>
        &nbsp;&nbsp;&nbsp;
        {isAuthenticated ? (
          <NavLink to="/logout" className="nav-link" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
        {/* <button onClick={() => handleHistoryClick}>Parking History</button>
      <button onClick={navigator}>Profile</button> */}
      </div>
      {/* <div className="bottom-button">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink
          to="/parkinghistory"
        >
          Activity
        </NavLink>
      </div> */}
    </div>
  );
};

export default TopNavigationBar;
