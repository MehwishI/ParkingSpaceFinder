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
import { getRealAddress } from "services/getCoordinatesService.js";

const ParkingHistory = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [historyExist, setHistoryExist] = useState(false);

  //const location = useLocation();
  //const { getUserId } = location.state || {};
  const { user, isAuthenticated, isLoading } = useAuth0();

  const getUserId = isAuthenticated ? user.sub : null;
  const getRealParkAddress = async (coords) => {
    const address = await getRealAddress(coords);

    return address;
  };

  useEffect(() => {
    const getHistory = async () => {
      let parkAddr = [];
      try {
        if (!isAuthenticated) {
          return null;
        }
        const getUserHist = await getUserParkingHistory(getUserId);
        //getUserHist.then((history) => {
        console.log("history", getUserHist);
        setHistoryExist(true);
        setUserHistory(getUserHist);
        //getreal address from history
        getUserHist.map((item) => {
          console.log("history coords:", item.locLatitude, item.locLongitude);
          const coords = {
            lat: item.locLatitude.$numberDecimal,
            lng: item.locLongitude.$numberDecimal,
          };
          const res = getRealParkAddress(coords);
          const add = res.data;
          console.log("res.data", res.data);
          parkAddr.push(add.formattedAddress);
        });
        console.log("parkAddr:", parkAddr);
        // })
        //});
        if (!getUserHist) {
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
