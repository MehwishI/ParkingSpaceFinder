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

  // console.log("location state", getCurrentLocation.state);
  // //const data = await getCoordinatesService(address);
  // //console.log(data);
  // // const addressCoord = data.geometry.location;

  const getCoordPointsForMap = (resJsonData) => {
    console.log("res Json Data", resJsonData);

    processJsonData(resJsonData);
  };

  const processJsonData = (splitJsonData) => {
    const splitText = splitJsonData.replace("Json Data", "").trim();

    const splittedJson = JSON.parse(splitText);

    // const splittedCoords = splittedJson.parking.map(parkingSpot => parkingSpot.coordinates);

    setDestCoord(splittedJson);
  };

  // //
  //console.log("params:", params);
  const addressCoordinate = location.state.addressCoordinate.addressCoordinate;
  //const { addressCoordinate, getRealAddress } = location.state || {};
  // const onDataChange = location.state.onDataChange.onDataChange;
  const searchInput = location.state.searchInput.inputValue;

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
    setCurrentLocAdd(resData);
  };

  // console.log("addressCoordinate:", addressCoordinate);
  const coord = {
    lat: addressCoordinate.addressCoordinate.lat,
    lng: addressCoordinate.addressCoordinate.lng,
  };

  // const onDataChange = props.onDataChange;

  console.log("coord:", coord);
  useEffect(() => {
    // console.log("locRes", destCoord);

    console.log("location result", addressCoordinate.addressCoordinate);
    const fetchdata = async () => {
      try {
        if (Object.keys(addressCoordinate.addressCoordinate).length > 0) {
          console.log("wpa hello", addressCoordinate.addressCoordinate);

          setDestCoord(coord); //setting destCoord

          if (
            coord.lat != null &&
            coord.lng != null &&
            typeof coord.lat === "number" &&
            typeof coord.lng === "number"
          ) {
            console.log("terry flex");

            const wpaLocRes = await locResultForCoord(coord);

            console.log("wpaLocRes in LocationResult.js", wpaLocRes);
            if (wpaLocRes.length === 0) {
              console.log("No Parking locations found around this address");
            }
            setLocRes(wpaLocRes);
          } else {
            console.log("No coordinates available");
          }

          //  const wpaLocRes = await response.json();
        } else {
          console.log("coord is empty:", coord);
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
      <AISuggestion onDataChange={getCoordPointsForMap} getCurrLoc={addressCoordinate.addressCoordinate} locRealAdd={getRealAddress} />
      <LocationList wpaLocRes={locRes} />
    </div>
  );
};

export default LocationResult;
