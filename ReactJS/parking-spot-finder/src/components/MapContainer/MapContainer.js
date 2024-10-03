import React from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader, MarkerF, InfoWindow, Polyline, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import './MapContainer.css'
import { locResultForCoord } from '../../services/locationResultService';

// const MapContainer = ({ coordinates }) => {
const MapContainer = ({ wpaResData }) => {
  const [getLocPoints, setLocPoints] = useState([]);
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const boundsRef = useRef(null);
  const [directResp, setDirectResp] = useState(null);

  const constLocData = {
    lat: 49.821311,
    lng:  -97.157452,
    title: 'Marker 1',
    description: 'Test Location'
  };

  const constLocDataTwo = {
    lat: 49.815678,
    lng:  -97.208330,
    title: 'Marker 2',
    description: 'Test Location two'
  };

  let initialCenter = { lat: 48.1, lng: -97.39 }
  const [defaultCenter, setDefaultCenter] = useState(initialCenter)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapStyles = {
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "none",
    align: "center"
    // justify-content: "center"
  };

  const getAllLocs = async () => {
    try {
      console.log("got coordinates", wpaResData.coordinates);
      const getCoordPoints = wpaResData.coordinates;

      const locServiceCoord = await locResultForCoord(getCoordPoints);

      const constLocData = locServiceCoord.map((item, index) => ({
        lat: Number(item.location.latitude),
        lng: Number(item.location.longitude),
        title: `Marker ${index + 1}`,
        description: item.location.description
      }));

      setLocPoints(constLocData);

      if (map && constLocData.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        constLocData.forEach((loc) => bounds.extend(loc));
        boundsRef.current = bounds;
        map.fitBounds(bounds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocaton = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // const center = { lat: lat, lng: long };
        setDefaultCenter(userLocaton);

        if (map) {
          map.panTo(userLocaton);
          map.setZoom(15);
        }
      },
      (error) => {
        console.log(error);
      });

    getAllLocs();
  }, [map])

const handleMapLoad = (mapInstance) => {
  setMap(mapInstance);
};

const handleMarkerClick = (marker) => {
  if (activeMarker === marker) {
    
    setActiveMarker(null);
  } else {
    console.log("I am getting to marker");
    setActiveMarker(marker);
  }
};

const getHandleDrawPoly = async (destination) => {
  if (defaultCenter && destination) {
    const dirService = new window.google.maps.DirectionsService();

    const getRes = await dirService.route({
      origin: defaultCenter,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    if (getRes.status === 'OK') {
      setDirectResp(getRes);
    } else {
      console.error(`Failed to fetch direction`);
    }
  }
}

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='mapcontainer'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
        onLoad={handleMapLoad}
      >
        {/* {getLocPoints.map((locPoints, index) => (
          <MarkerF
            key={index}
            title={locPoints.title}
            position={{ lat: locPoints.lat, lng: locPoints.lng }}
            animation="DROP"
            onClick={() => handleMarkerClick(locPoints)}
          />
        ))} */}
        <MarkerF key="current_location" title="You are here!" animation="DROP" position={constLocData} onClick={() => handleMarkerClick(constLocData)}/>
        <MarkerF key="current_location" title="You are here!" animation="DROP" position={constLocDataTwo} onClick={() => handleMarkerClick(constLocDataTwo)}/>

        <MarkerF key="current_location" title="You are here!" animation="DROP" position={{ lat: defaultCenter.lat, lng: defaultCenter.lng }} />

        {activeMarker && (
          <InfoWindow
           position={{ lat: activeMarker.lat, lng: activeMarker.lng}}
           onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h3>{activeMarker.title}</h3>
              <p>{activeMarker.description}</p>
              <button onClick={() => getHandleDrawPoly(activeMarker)}>
                View Details
              </button>
            </div>
          </InfoWindow>
        )}

        {directResp && (
          <DirectionsRenderer
          directions={directResp}
          options={{
            polylineOptions: {
              strokeColor: '#FF0000',
              strokeWeight: 5,
            }
          }}
          />
        )}
      </GoogleMap>

    </div>

  );
}
export default MapContainer
