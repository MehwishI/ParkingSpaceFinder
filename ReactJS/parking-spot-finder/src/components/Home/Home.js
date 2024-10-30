import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import MapContainer from "../MapContainer/MapContainer";
import TopNavigationBar from "components/TopNavigationBar/TopNavigationBar";
import AISuggestion from "components/AISuggestion/AISuggestion";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import HomeParkingList from "components/HomeParkingList/HomeParkingList";
import HomeParkingHistory from "components/HomeParkingList/HomeParkingHistory";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [getCurrentLocAdd, setCurrentLocAdd] = useState({});
  const [getWpaSearchRes, setWpaSearchRes] = useState([]);
  const [getAiCoordinates, setAiCoordinates] = useState(null);
  const [getAllParkingLocs, setAllParkingLocs] = useState([]);
  const { isAuthenticated, isLoading } = useAuth0();
  const [mapHeight, setMapHeight] = useState('120px');
  const [labelPark, setLabelPark] = useState(true);

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

  const getCurrentAddress = () => { };

  const getAllLocsCoord = (getAllLocs) => {
    setAllParkingLocs(getAllLocs);
  };

  useEffect(() => {
    if (getAllParkingLocs.length > 0) {
      setMapHeight("120px");
    } else {
      setMapHeight("450px");
      setLabelPark(false);
    }
  }, [getAllParkingLocs])

  return (
    <>
      <div className="container">
        <div className="serach-style">
          <Search onDataChange={getHandleDataChange} backgroundColor={'#129F4E'} marginLeft={'2px'} isHomeScreen={true} />
        </div>

        <HomeParkingHistory />

        {labelPark === false && (
          <label className="park-label-style">
            <b>Parkings near you</b>
          </label>
        )}

        <div className="map-outer-container">
          <div className="map-second-layer">
            <div className="mapcontainer-home" style={{ height: mapHeight }}>
              <MapContainer
                wpaResData={getWpaSearchRes}
                aiSugData={getAiCoordinates}
                onDataChange={getCurrentLocCoords}
                getAllLocsData={getAllParkingLocs}
              />
            </div>

            <div className="col-sm-6 align-items-center overlay-box">
              <span className="overlay-text-up" >Polo Park Winnipeg, MB</span><br></br>
              <span className="overlay-text-down" >Polo Park Winnipeg, MB</span>
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
