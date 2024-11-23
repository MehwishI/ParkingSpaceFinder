import React, { useEffect, useState } from "react";
import "./HomeParkingHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { getUserParkingHistory } from "services/parkingHistoryService";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';

const parkingJson = [
  
]

const HomeParkingHistory = () => {
  const [dataHist, setDataHist] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const getUserId = user ? user.sub : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserParkingHist();
    }
  }, [isAuthenticated]);

  const fetchUserParkingHist = async () => {
    try {

      const getData = await getUserParkingHistory(getUserId);

      return getData;
    } catch (error) {
      console.error(error);
    }
  };

  const loginPage = () => {
    navigate('/login');
};

  return (
    
    <div className="park-hist-style">
      
      {!isAuthenticated ? (
        <div className="login-text-style">Please <a onClick={loginPage} href='#'>login</a> to see latest parking history</div>
      ) : parkingJson && parkingJson.length > 0 ? (
        parkingJson.slice(0, 2).map((item, index) => (
          <div className="row" key={index}>
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
      ) : (
        <div className="login-text-style">No parking history available</div>
      )}
    </div>
  );
};

export default HomeParkingHistory;
