import React, { useEffect } from "react";
import { useLocation } from "react-router";
import MapContainer from "components/MapContainer/MapContainer";
import "./MapDirection.css";

const MapDirection = () => {
  const getLocation = useLocation();
  const { coords, currCoords } = getLocation.state || {};

  const destCoord = {};
  const currentCoords = {};

  useEffect(() => {
    // build destination coordinates
    destCoord.lat = parseFloat(coords.lat);
    destCoord.lng = parseFloat(coords.lng);

    // build current coordinates
    currentCoords.lat = parseFloat(currCoords.lat);
    currentCoords.lng = parseFloat(currCoords.lng);
  }, []);

  const getCurrentLocCoords = (resData) => {};

  return (
    <>
      <div className="map-container">
        <MapContainer
          wpaResData={{}}
          aiSugData={{}}
          onDataChange={getCurrentLocCoords}
          getAllLocsData={null}
          directionCoords={destCoord}
          curCoords={currentCoords}
        />
        {/* <div>Destination Coordinates {coords.lat}</div>
            <div>Current Coordinates {currCoords.lat}</div> */}
      </div>
    </>
  );
};

export default MapDirection;
