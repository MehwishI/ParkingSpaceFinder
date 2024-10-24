import React, { useEffect, useState } from "react";
import "./HomeParkingHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { getUserParkingHistory } from "services/parkingHistoryService";
import { useAuth0 } from "@auth0/auth0-react";

const parkingJson = [
  {
    "_id": "670c5fd23c7776b031eb2c2a",
    "city": "Winnipeg",
    "parking_date": "2024-10-14T00:03:30.599Z",
    "locLatitude": {
      "$numberDecimal": "49.88923110889316"
    },
    "locLongitude": {
      "$numberDecimal": "-97.14566297615906"
    },
    "user": "6702edf7b5f88cae471a9bec",
    "paystation_number": "3400",
    "restriction": "NONE",
    "time_limit": "2 HOUR PARKING",
    "street": "Edmonton ST",
    "total_space": "15",
    "accessible_space": "0",
    "hourly_rate": "2.75",
    "mobile_pay_zone": "5465",
    "__v": 0
  },
  {
    "_id": "670c5fd23c7776b031eb2c2a",
    "city": "Toronto",
    "parking_date": "2024-10-14T00:03:30.599Z",
    "locLatitude": {
      "$numberDecimal": "49.88923110889316"
    },
    "locLongitude": {
      "$numberDecimal": "-97.14566297615906"
    },
    "user": "6702edf7b5f88cae471a9bec",
    "paystation_number": "3400",
    "restriction": "NONE",
    "time_limit": "2 HOUR PARKING",
    "street": "Lara ST",
    "total_space": "15",
    "accessible_space": "0",
    "hourly_rate": "2.75",
    "mobile_pay_zone": "5465",
    "__v": 0
  },
  {
    "_id": "670c5fd23c7776b031eb2c2a",
    "city": "Winnipeg",
    "parking_date": "2024-10-14T00:03:30.599Z",
    "locLatitude": {
      "$numberDecimal": "49.88923110889316"
    },
    "locLongitude": {
      "$numberDecimal": "-97.14566297615906"
    },
    "user": "6702edf7b5f88cae471a9bec",
    "paystation_number": "3400",
    "restriction": "NONE",
    "time_limit": "2 HOUR PARKING",
    "street": "Polo Park ST",
    "total_space": "15",
    "accessible_space": "0",
    "hourly_rate": "2.75",
    "mobile_pay_zone": "5465",
    "__v": 0
  }
]

const HomeParkingHistory = () => {
  const [dataHist, setDataHist] = useState([]);
  const { user } = useAuth0();
  const getUserId = user ? user.sub : null;

  useEffect(() => {
    fetchUserParkingHist();
  });

  const fetchUserParkingHist = async () => {
    try {

      const getData = await getUserParkingHistory(getUserId);

      return getData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="park-hist-style">
    //   <div className="row">
    //     <div className="col-sm-3 d-flex align-items-center out-gen-style">
    //       <FontAwesomeIcon icon={faHistory} size="1x" color="#000000" />
    //       <div className="text-style">
    //         <div className="text-top">
    //           <b>Home Parking History</b>
    //         </div>
    //         <div className="text-bottom">Home Parking History Text</div>
    //       </div>
    //     </div>
    //     <hr className="line-style"></hr>
    //     <div className="col-sm-3 d-flex align-items-center out-gen-style">
    //       <FontAwesomeIcon icon={faHistory} size="1x" color="#000000" />
    //       <div className="text-style">
    //         <div className="text-top">
    //           <b>Home Parking History</b>
    //         </div>
    //         <div className="text-bottom">Home Parking History Text</div>
    //       </div>
    //     </div>
    //     <hr className="line-style"></hr>
    //   </div>
    // </div>

    <div className="park-hist-style">
      {parkingJson && (
        parkingJson.map((item, index) => (
          <div className="row">
            <div className="col-sm-3 d-flex align-items-center out-gen-style">
              <FontAwesomeIcon icon={faHistory} className="custom-icon" />
              <div className="text-style">
                <div className="text-top">
                  <b>{item.street}</b>
                </div>
                <div className="text-bottom">{item.city}, Manitoba, CA</div>
              </div>
            </div>
            <hr className="line-style"></hr>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeParkingHistory;
