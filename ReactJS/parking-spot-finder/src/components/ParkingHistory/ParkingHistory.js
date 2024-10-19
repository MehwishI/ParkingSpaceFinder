import React, { useEffect, useState } from "react";
import LocationItem from "../LocationItem/LocationItem.js";
import { useLocation } from "react-router-dom";
import {
  getUserParkingHistory,
  saveUserParkingHistory,
} from "../../services/parkingHistoryService";
import { useAuth0 } from "@auth0/auth0-react";
import "./ParkingHistory.css";
import { NavLink } from "react-router-dom";

const ParkingHistory = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [historyExist, setHistoryExist] = useState(false);

  //const location = useLocation();
  //const { getUserId } = location.state || {};
  const { user, isAuthenticated, isLoading } = useAuth0();

  const getUserId = isAuthenticated ? user.sub : null;

  useEffect(() => {
    const getHistory = async () => {
      try {
        if (!isAuthenticated) {
          console.log(
            "User not logged in. Please log in to view your parking history."
          );
          return null;
        }
        const getUserHist = await getUserParkingHistory(getUserId);
        console.log("history:", getUserHist);
        //getUserHist.then((history) => {
        setHistoryExist(true);
        setUserHistory(getUserHist);
        //});
        if (!getUserHist) {
          console.log("No parking history available.");
          setUserHistory(null);
          setHistoryExist(false);
          return null;
        }
        //setHistoryExist(true);
        // setUserHistory(getUserHist);
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="history-container">
      <h2>Past Parkings</h2>
      <div>
        {" "}
        {historyExist ? (
          <div>
            {userHistory.map((item) => (
              <div className="location-item">
                <LocationItem key={item._id} locationItem={item} />
              </div>
            ))}
          </div>
        ) : (
          <div>No Parking History available</div>
        )}
      </div>
      {!isAuthenticated && (
        <div>
          <NavLink to="/login">
            Login here to view your parking history!
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ParkingHistory;
