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
  const [addArray, setAddArray] = useState([]);
  //const [coordArr, setCoordArr] = useState([]);

  //const location = useLocation();
  //const { getUserId } = location.state || {};
  const { user, isAuthenticated, isLoading } = useAuth0();

  const getUserId = isAuthenticated ? user.sub : null;
  let parkAddr = [];
  let coordArr = [];
  let temp = [];
  const getRealParkAddress = async (coordArr) => {
    for (const item of coordArr) {

      try {
        const address = await getRealAddress(item);
        if (address.formattedAddress) {
          temp.push(address.formattedAddress);
        }
      } catch (error) {
        console.log(error);
      }

    }
    if (temp) {
      parkAddr = temp;
      // return address;
      setAddArray(parkAddr);
      return parkAddr;
    }
  };

  useEffect(() => {
    coordArr = [];
    const getHistory = async () => {
      let temp1 = [];
      try {
        if (!isAuthenticated) {
          return null;
        }
        const getUserHist = await getUserParkingHistory(getUserId);
        setHistoryExist(true);
        setUserHistory(getUserHist);
        if (!getUserHist) {
          setUserHistory(null);
          setHistoryExist(false);
          return null;
        }
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
          <>
            <div>
              {userHistory.map((item) => (
                <div className="location-item">
                  <LocationItem key={item._id} locationItem={item} />
                </div>
              ))}
            </div>
            <div>
              {addArray ? (
                addArray.map((item) => <div>{item.formattedAddress}</div>)
              ) : (
                <div>hello</div>
              )}
            </div>
          </>
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
