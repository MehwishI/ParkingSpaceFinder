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
  const location = useLocation(); //getting current location

  // console.log("location state", getCurrentLocation.state);
  // //const data = await getCoordinatesService(address);
  // //console.log(data);
  // // const addressCoord = data.geometry.location;

  // //
  //console.log("params:", params);
  const addressCoordinate = location.state.addressCoordinate.addressCoordinate;
  // const onDataChange = location.state.onDataChange.onDataChange;

  console.log("addressCoordinate:", addressCoordinate);
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
      />
      <MapLocContainer wpaResData={locRes} />

      <LocationList wpaLocRes={locRes} />
    </div>
  );
};

export default LocationResult;
