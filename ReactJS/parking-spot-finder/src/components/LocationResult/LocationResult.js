import React, { useState, useEffect } from "react";
import {
  locAllResultSearch,
  locResultForCoord,
} from "../../services/locationResultService";
import { useLocation } from "react-router-dom";
import MapLocContainer from "../MapLocContainer/MapLocContainer";
import LocationList from "./LocationList";
import Search from "components/Search/Search";
import "./LocationResult.css";
import { cardActionAreaClasses } from "@mui/material";
import AISuggestion from "components/AISuggestion/AISuggestion";
//import { getCoordinatesService } from "/services/getCoordinatesService";
import { getRealAddress } from "../../services/getCoordinatesService";

const LocationResult = () => {
  //const coordinates = props.coordinates;
  const [locRes, setLocRes] = useState([]);
  const [getCurrentLocAdd, setCurrentLocAdd] = useState({});
  const [destCoord, setDestCoord] = useState({});
  const location = useLocation(); //getting current location

  const getCoordPointsForMap = (resJsonData) => {
    processJsonData(resJsonData);
  };

  const processJsonData = (splitJsonData) => {
    const splitText = splitJsonData.replace("Json Data", "").trim();

    const splittedJson = JSON.parse(splitText);

    setDestCoord(splittedJson);
  };

  const { addressCoordinate, getRealAddress } = location.state || {};
  const searchInput = location.state.searchInput.inputValue;

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
    setCurrentLocAdd(resData);
  };

  const coord = {
    lat: addressCoordinate.addressCoordinate.lat,
    lng: addressCoordinate.addressCoordinate.lng,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (Object.keys(addressCoordinate.addressCoordinate).length > 0) {

          setDestCoord(coord); //setting destCoord

          if (
            coord.lat != null &&
            coord.lng != null &&
            typeof coord.lat === "number" &&
            typeof coord.lng === "number"
          ) {
            const wpaLocRes = await locResultForCoord(coord);

            console.log("hayo", wpaLocRes);


            if (wpaLocRes.length === 0) {
            }
            setLocRes(wpaLocRes);
          } else {
          }

          //  const wpaLocRes = await response.json();
        } else {
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchdata();
  }, []);

  //map and list

  const getHandleDataChange = (resData) => {
    setLocRes(resData);
  };

  //const { address, coordinates } = getCurrentLocation.state || {};

  return (
    <div className="loc-result-container">
      <Search
        // onDataChange={getHandleDataChange}
        backgroundColor={"none"}
        marginLeft={"10px"}
        searchInput={searchInput}
        isHomeScreen={false}
      />
      <div className="map-container">
        <MapLocContainer
          wpaResData={locRes}
          onDataChange={getCurrentLocCoords}
          destCoord={destCoord}
        />
      </div>

      {locRes && (
        <AISuggestion onDataChange={getCoordPointsForMap} getCurrLoc={addressCoordinate.addressCoordinate} locRealAdd={getRealAddress} />
      )}

      <LocationList wpaLocRes={locRes} getAIResDetails={destCoord} />
    </div>
  );
};

export default LocationResult;
