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
//import { getCoordinatesService } from "/services/getCoordinatesService";

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

  // //
  //console.log("params:", params);
  const addressCoordinate = location.state.addressCoordinate.addressCoordinate;
  // const onDataChange = location.state.onDataChange.onDataChange;
  const searchInput = location.state.searchInput.inputValue;
  console.log(searchInput);

  // get current location when page loads
  const getCurrentLocCoords = (resData) => {
    setCurrentLocAdd(resData);
  };

  // console.log("addressCoordinate:", addressCoordinate);
  const coord = {
    lat: addressCoordinate.lat,
    lng: addressCoordinate.lng,
  };

  // const onDataChange = props.onDataChange;

  console.log("coord:", coord);
  useEffect(() => {
    console.log("locRes", locRes);
    const fetchdata = async () => {
      try {
        if (addressCoordinate !== {}) {
          setDestCoord(coord); //setting destCoord
          const wpaLocRes = await locResultForCoord(coord);

          //  const wpaLocRes = await response.json();

          console.log("wpaLocRes in LocationResult.js", wpaLocRes);
          if (wpaLocRes.length === 0) {
            console.log("No Parking locations found around this address");
          }
          setLocRes(wpaLocRes);
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
        onDataChange={getHandleDataChange}
        backgroundColor={"none"}
        marginLeft={"10px"}
        searchInput={searchInput}
      />
      <MapLocContainer
        wpaResData={locRes}
        onDataChange={getCurrentLocCoords}
        destCoord={destCoord}
      />

      <LocationList wpaLocRes={locRes} />
    </div>
  );
};

export default LocationResult;
