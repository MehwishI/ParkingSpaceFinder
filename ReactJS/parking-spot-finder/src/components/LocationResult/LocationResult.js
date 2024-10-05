import React, { useState, useEffect } from "react";
import { locAllResultSearch } from "../../services/locationResultService";
import { useLocation } from "react-router-dom";
import MapContainer from "../MapContainer/MapContainer";
//import { getCoordinatesService } from "/services/getCoordinatesService";

const LocationResult = () => {
  const getCurrentLocation = useLocation(); //getting current location

  console.log("location state", getCurrentLocation.state);
  //const data = await getCoordinatesService(address);
  //console.log(data);
  // const addressCoord = data.geometry.location;

  // console.log(addressCoord);

  const { address, coordinates } = getCurrentLocation.state || {};

  return (
    <>
      <MapContainer coordinates={coordinates} />
      <div>LocationResult</div>
      {address}
    </>
  );
};

export default LocationResult;
