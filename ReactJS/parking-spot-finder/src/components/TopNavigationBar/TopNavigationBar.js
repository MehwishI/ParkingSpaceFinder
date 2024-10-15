import { NavLink } from "react-router-dom";
import React from "react";
import "./TopNavigationBar.css";
import Login from "../Authentication/Login";
import Logout from "components/Authentication/Logout";
import ParkingHistory from "../ParkingHistory/ParkingHistory";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../Profile/Profile.js";
import Home from "../Home/Home";

const TopNavigationBar = () => {
  //get userid
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log("user:", user);
  // console.log(isAuthenticated);

  // const handleHistoryClick = () => {
  //   return isAuthenticated ? <ParkingHistory getUserId={user.sub} /> : "";
  // };

  // const handleProfileClick = () => {
  //   return isAuthenticated ? <Profile /> : "";
  // };
  //console.log(Login, Logout, ParkingHistory, Profile, Home);

  return (
    // <Routes>
    //   <Route path="/profile" element={<Profile />} />
    // </Routes>

    <div className="nav-container">
      <h3>SmartPark</h3>
      <div>
        {isAuthenticated ? (
          <Logout />
        ) : (
          <>
            <Login />
            <>You are not logged in yet</>
          </>
        )}
      </div>
      <div className="top-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink
          to="/parkinghistory"
          state={{ getUserId: isAuthenticated ? user.sub : "" }}
        >
          Parking History
        </NavLink>
        {/* <button onClick={() => handleHistoryClick}>Parking History</button>
      <button onClick={navigator}>Profile</button> */}
      </div>
      <div className="bottom-button">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink
          to="/parkinghistory"
          state={{ getUserId: isAuthenticated ? user.sub : "" }}
        >
          Parking History
        </NavLink>
      </div>
    </div>
  );
};

export default TopNavigationBar;
