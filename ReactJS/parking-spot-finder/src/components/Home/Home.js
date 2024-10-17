import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import MapContainer from "../MapContainer/MapContainer";
import TopNavigationBar from "components/TopNavigationBar/TopNavigationBar";
import AISuggestion from "components/AISuggestion/AISuggestion";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import HomeParkingList from "components/HomeParkingList/HomeParkingList";
import HomeParkingHistory from "components/HomeParkingList/HomeParkingHistory";

const Home = () => {
  const [getCurrentLocAdd, setCurrentLocAdd] = useState({});
  const [getWpaSearchRes, setWpaSearchRes] = useState([]);
  const [getAiCoordinates, setAiCoordinates] = useState(null);

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
    setCurrentLocAdd(resData);
  };

  const getHandleDataChange = (resData) => {
    setWpaSearchRes(resData);
  };

  const getHandleAiSuggestion = (aiResData) => {
    setAiCoordinates(aiResData);
  };

  return (
    <>
      <div>
        <Search onDataChange={getHandleDataChange} />

          <HomeParkingHistory />

          <label className="park-label-style"><b>Parkings near you</b></label>

          <MapContainer
            wpaResData={getWpaSearchRes}
            aiSugData={getAiCoordinates}
            onDataChange={getCurrentLocCoords}
          />

          <div className="row overlay-box">
            <div className="col-sm-6 d-flex align-items-center">
              <FontAwesomeIcon icon={faLocationArrow} size="1x" color="#000000" />
              <span className="ms-2 overlay-text" >Polo Park Winnipeg, MB</span>
            </div>

            <HomeParkingList />
          </div>

        <AISuggestion
          onDataChange={getHandleAiSuggestion}
          getDestLoc={getWpaSearchRes}
          getCurrLoc={getCurrentLocAdd}
        />
      </div>
    </>
  );
};

export default Home;
