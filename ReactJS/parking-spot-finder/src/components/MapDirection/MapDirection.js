import React from 'react';
import { useLocation } from 'react-router';
import MapContainer from 'components/MapContainer/MapContainer';

const MapDirection = () => {
    const getLocation = useLocation();
    const { coords } = getLocation.state || {};

    const getCurrentLocCoords = (resData) => {
      };

    return (
        <>
            <MapContainer
                wpaResData={{}}
                aiSugData={{}}
                onDataChange={getCurrentLocCoords}
            />
            <div>MapDirection {console.log("in directions page", coords)}</div>
        </>
    )
}

export default MapDirection