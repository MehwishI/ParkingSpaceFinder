import React, { useEffect, useState } from "react";
import "./HomeParkingHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { getUserParkingHistory } from "services/parkingHistoryService";
import { useAuth0 } from "@auth0/auth0-react";

const HomeParkingHistory = () => {
  const [dataHist, setDataHist] = useState([]);
  const { user } = useAuth0();
  const getUserId = user ? user.sub : null; // check here if authenticated or not

  useEffect(() => {
    fetchUserParkingHist();
  });

  const fetchUserParkingHist = async () => {
    try {
      // console.log("id user", getUserId);

      const getData = await getUserParkingHistory(getUserId);

      console.log("get data", getData);

      return getData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="park-hist-style">
      <div className="row">
        <div className="col-sm-3 d-flex align-items-center out-gen-style">
          <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#000000" />
          <div className="text-style">
            <div className="text-top">
              <b>Home Parking History</b>
            </div>
            <div className="text-bottom">Home Parking History Text</div>
          </div>
        </div>
        <hr className="line-style"></hr>
        <div className="col-sm-3 d-flex align-items-center out-gen-style">
          <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#000000" />
          <div className="text-style">
            <div className="text-top">
              <b>Home Parking History</b>
            </div>
            <div className="text-bottom">Home Parking History Text</div>
          </div>
        </div>
        <hr className="line-style"></hr>
      </div>
    </div>
  );
};

export default HomeParkingHistory;
