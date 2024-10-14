import React, { useEffect, useState } from "react";
import LocationItem from "../LocationItem/LocationItem.js";
import { useLocation } from "react-router-dom";
import {
  getUserParkingHistory,
  saveUserParkingHistory,
} from "../../services/parkingHistoryService";

const ParkingHistory = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [historyExist, setHistoryExist] = useState(false);

  const location = useLocation();
  const { getUserId } = location.state || {};
  // console.log("getUserId:", getUserId);

  const getHistory = async (getUserId) => {
    try {
      const getUserHist = await getUserParkingHistory(getUserId);
      console.log("history:", getUserHist);
      //getUserHist.then((history) => {
      setHistoryExist(true);
      setUserHistory(getUserHist);
      //});
      if (!getUserHist) {
        console.log("No parking history available.");
        return null;
      }
      //setHistoryExist(true);
      // setUserHistory(getUserHist);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory(getUserId);
  }, []);

  return (
    <div>
      <h2>Parking History</h2>
      <div>
        {" "}
        {historyExist ? (
          <div>
            {userHistory.map((item) => (
              <div>
                <LocationItem key={item._id} locationItem={item} />
              </div>
            ))}
          </div>
        ) : (
          <div>No Parking History available</div>
        )}
      </div>
    </div>
  );
};

export default ParkingHistory;
