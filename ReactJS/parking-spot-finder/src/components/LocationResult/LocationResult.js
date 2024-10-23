import React, { useState, useEffect } from "react";
import {
  locAllResultSearch,
  locResultForCoord,
} from "../../services/locationResultService";
import { useLocation } from "react-router-dom";
import MapContainer from "../MapContainer/MapContainer";
import LocationList from "./LocationList";
import "./LocationResult.css";
//import { getCoordinatesService } from "/services/getCoordinatesService";

const LocationResult = async (props) => {
  //const coordinates = props.coordinates;
  // const getCurrentLocation = useLocation(); //getting current location

  // console.log("location state", getCurrentLocation.state);
  // //const data = await getCoordinatesService(address);
  // //console.log(data);
  // // const addressCoord = data.geometry.location;

  // // console.log(addressCoord);
  const addressCoord = props.addressCoord;
  const onDataChange = props.onDataChange;

  const wpaLocRes = await locResultForCoord(addressCoord);
  console.log(wpaLocRes);

  //map and list

  //const { address, coordinates } = getCurrentLocation.state || {};

  return (
    <div className="loc-result-container">
      <MapContainer
        wpaResData={wpaLocRes}
        addressCoord={addressCoord}
        onDataChange={onDataChange}
      />

      {/* <LocationList wpaLocRes={wpaLocRes} /> */}
    </div>
  );
};

export default LocationResult;
