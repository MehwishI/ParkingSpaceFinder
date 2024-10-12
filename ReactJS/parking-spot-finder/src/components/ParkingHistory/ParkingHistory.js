import React, { useEffect, useState } from "react";
import { getUserParkingHistory, saveUserParkingHistory } from "../../services/parkingHistoryService";

const ParkingHistory = (getUserId) => {
  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
      try {
          const getUserHist = getUserParkingHistory(getUserId);

          setUserHistory(getUserHist)
      } catch (error) {
          console.error(error);
      }
  });

  return <div>Parking History
          <h2></h2>
  </div>;
};

export default ParkingHistory;
