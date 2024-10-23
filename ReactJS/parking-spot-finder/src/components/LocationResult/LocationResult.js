import React, { useState, useEffect } from "react";
import {
  locAllResultSearch,
  locResultForCoord,
} from "../../services/locationResultService";
import { useLocation } from "react-router-dom";
import MapContainer from "../MapContainer/MapContainer";
//import { getCoordinatesService } from "/services/getCoordinatesService";

const LocationResult = async (props) => {
  const coordinates = props.coordinates;
  const addressCoord = props.addressCoord;
  const onDataChange = props.onDataChange;

  const wpaLocRes = await locResultForCoord(coordinates);

  return (
    <div className="loc-result-container">
      <MapContainer
        wpaResData={wpaLocRes}
        addressCoord={addressCoord}
        onDataChange={onDataChange}
      />
    </div>
  );
};

export default LocationResult;
