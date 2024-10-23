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
  const [getAllParkingLocs, setAllParkingLocs] = useState([]);

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
     setCurrentLocAdd(resData);
    console.log("after it gets out...", getCurrentLocAdd);
    };

  const getHandleDataChange = (resData) => {
    setWpaSearchRes(resData);
  };

  const getHandleAiSuggestion = (aiResData) => {
    setAiCoordinates(aiResData);
  };

  const getCurrentAddress = () => {

  };

  const getAllLocsCoord = (getAllLocs) => {
    setAllParkingLocs(getAllLocs);
  };

  return (
    <>
      <div className="container">
        <Search onDataChange={getHandleDataChange} />

        <HomeParkingHistory />

        <label className="park-label-style"><b>Parkings near you</b></label>

        <div className="map-outer-container">

          <div className="map-second-layer">
            <MapContainer
              wpaResData={getWpaSearchRes}
              aiSugData={getAiCoordinates}
              onDataChange={getCurrentLocCoords}
              getAllLocsData={getAllParkingLocs}
            />

            <div className="col-sm-6 align-items-center overlay-box">
              <span className="ms-2 overlay-text-up" >Polo Park Winnipeg, MB</span><br></br>
              <span className="ms-2 overlay-text-down" >Polo Park Winnipeg, MB</span>
            </div>
          </div>

          <HomeParkingList 
          getAllParkList={getAllLocsCoord}
          getCurrLocAdd={getCurrentLocAdd}
          />
        </div>

        {/* <AISuggestion
          onDataChange={getHandleAiSuggestion}
          getDestLoc={getWpaSearchRes}
          getCurrLoc={getCurrentLocAdd}
        /> */}
      </div>
    </>
  );
};

export default Home;
