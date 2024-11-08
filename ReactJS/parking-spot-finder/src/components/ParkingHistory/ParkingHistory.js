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

        //getUserHist.then((history) => {
        console.log("history", getUserHist);
        console.log(getUserHist.status);
        if (getUserHist.status !== 200) {
          setUserHistory(null);
          setHistoryExist(false);
          // return null;
        } else {
          setHistoryExist(true);
          setUserHistory(getUserHist.data);
        }

        //getreal address from history
        // getUserHist.map((item) => {
        //   console.log("history coords:", item.locLatitude, item.locLongitude);
        //   const coords = {
        //     lat: item.locLatitude.$numberDecimal,
        //     lng: item.locLongitude.$numberDecimal,
        //   };
        //   coordArr.push(coords);
        // });
        // console.log(coordArr);

        // setCoordArr(temp1);
        // try {
        //   const promises = getRealParkAddress(getUserHist);
        //   //console.log();
        //   // const add = res.formattedAddress;
        //   // console.log("add", add);
        //   // parkAddr.push(add);
        // } catch (error) {
        //   console.log("error in get real addresses", error);
        // }

        // await Promise.all(promises);

        // console.log("parkAddr:", parkAddr);
        // })
        //});

        //setHistoryExist(true);
        // setUserHistory(getUserHist);
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
    console.log("historyExist after:", historyExist);
    // getRealParkAddress();
  }, []);

  useEffect(() => {
    console.log("re-render after historyExist gets updated!");
    console.log("historyExist && userHistory", historyExist && userHistory);
    console.log(historyExist);
    console.log(userHistory);
  }, [historyExist]);
  // useEffect(() => {
  //   //const temp = [];

  //   getRealParkAddress(coordArr);
  //   //console.log(a);
  //   // setAddArray(a);
  //   //console.log("parkAddr", parkAddr);

  //   console.log("addArray in useEffect:", addArray);
  // }, [historyExist]);

  // const groupItems = (items) => {
  //   const grouped = {};

  //   items.forEach((item) => {
  //     if (!grouped[item.category]) {
  //       grouped[item.category] = [];
  //     }
  //     grouped[item.category].push(item);
  //   });

  //   return grouped;
  // };
  // const groupedItems = groupItems(items);
  // useEffect(() => {
  //   // setAddArray(parkAddr);
  //   console.log("addArray:", addArray);
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="history-container">
      <h2>Past Parkings</h2>
      <div>
        {" "}
        {historyExist && userHistory ? (
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
