import React from "react";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
  TrafficLayer,
} from "@react-google-maps/api";
import "./MapContainer.css";
import { locResultForCoord } from "../../services/locationResultService";
import CustomMarker from "../FontIcon/FontIcon";

// const MapContainer = ({ coordinates }) => {
const MapContainer = ({ wpaResData, aiSugData, onDataChange }) => {
  let initialCenter = {};

  const [getLocPoints, setLocPoints] = useState([]);
  const [getLocAiPoints, setLocAiPoints] = useState([]);
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const boundsRef = useRef(null);
  const [directResp, setDirectResp] = useState(null);
  const [selectedAiPoint, setSelectedAiPoint] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState(initialCenter);
  const [getDirectionResp, setDirectionResp] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapStyles = {
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "none",
    align: "center",
    // justify-content: "center"
  };

  const getAllLocs = async () => {
    try {
      const getCoordPoints = {
        lat: wpaResData.lat,
        lng: wpaResData.lng,
      };

      const locServiceCoord = await locResultForCoord(getCoordPoints);

      const constLocData = locServiceCoord.map((item, index) => ({
        lat: Number(item.location.latitude),
        lng: Number(item.location.longitude),
        title: `Marker ${index + 1}`,
        description: item.location.description,
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
    if (Object.keys(wpaResData).length > 0) {
      getAllLocs();
    }
  }, [wpaResData]);

  useEffect(() => {
    console.log("halos 222");
    if (aiSugData && map) {
      const convAiSugData = convertToObject(aiSugData);

      const getAiLocs = convAiSugData.parking.map((location) => ({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        title: location.name,
      }));

      setLocAiPoints(getAiLocs);
      fitBoundsWithRad(getAiLocs);
    }
  }, [aiSugData]);

  useEffect(() => {
    console.log("halos 333");
    // when map loads, get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocaton = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // const center = { lat: lat, lng: long };
        setDefaultCenter(userLocaton);

        onDataChange(userLocaton);

        if (map) {
          map.panTo(userLocaton);
          map.setZoom(15);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [map]);

  useEffect(() => {
    if (directResp) {
      const tesDirectn = { lat: 49.799473, lng: -97.165825 };
      getCalcRoute(defaultCenter, tesDirectn);
    }
  }, [directResp]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  const success = (position) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log("got position", currentPos);

    setDefaultCenter(currentPos);
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleMarkerClick = (marker) => {
    if (activeMarker === marker) {
      setActiveMarker(null);
    } else {
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

      if (getRes.status === "OK") {
        setDirectResp(getRes);
      } else {
        console.error(`Failed to fetch direction`);
      }
    }
  };

  const convertToObject = (jsonData) => {
    const parsedJson = JSON.parse(jsonData);

    return parsedJson;
  };

  const calcCenter = (aiPoint) => {
    const latSum = aiPoint.reduce((acc, point) => acc + point.lat, 0);
    const lngSum = aiPoint.reduce((acc, point) => acc + point.lng, 0);

    return {
      lat: latSum / aiPoint.length,
      lng: lngSum / aiPoint.length,
    };
  };

  const fitBoundsWithRad = (aiPoints) => {
    console.log("aipoint", aiPoints);

    if (map && aiPoints.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      aiPoints.forEach((aiPoint) => {
        bounds.extend(new window.google.maps.LatLng(aiPoint.lat, aiPoint.lng));
      });

      const center = calcCenter(aiPoints);

      map.setZoom(10);

      setTimeout(() => {
        map.panTo(center);

        setTimeout(() => {
          map.setZoom(15);
        }, 2000);
      }, 1000);
      // map.fitBounds(bounds);

      // const zoomLev = 15;
      // map.setCenter(center);
      // map.setZoom(zoomLev);
    }
  };

  const getCalcRoute = (origin, destination) => {
    const getDirectionService = new window.google.maps.DirectionsService();

    getDirectionService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionResp(result);
        } else {
          console.error("error fetching directions result");
        }
      }
    );
  };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mapcontainer">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
        onLoad={handleMapLoad}
      >
        {getLocPoints.map((locPoints, index) => (
          <MarkerF
            key={index}
            title={locPoints.title}
            position={{ lat: locPoints.lat, lng: locPoints.lng }}
            animation="DROP"
            onClick={() => handleMarkerClick(locPoints)}
          />
        ))}

        {/* {getLocAiPoints.map((locAiPoints, index) => (
          <MarkerF
            key={index}
            title={locAiPoints.title}
            position={{ lat: locAiPoints.lat, lng: locAiPoints.lng }}
            animation="DROP"
            onClick={() => handleMarkerClick(locAiPoints)}
          />
        ))} */}
        {/* <MarkerF key="current_location" title="You are here!" animation="DROP" position={constLocData} onClick={() => handleMarkerClick(constLocData)}/>
        <MarkerF key="current_location" title="You are here!" animation="DROP" position={constLocDataTwo} onClick={() => handleMarkerClick(constLocDataTwo)}/> */}

        <MarkerF
          key="current_location"
          title="You are here!"
          animation="DROP"
          // icon={{
          //   url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(<CustomMarker />),
          //   scaledSize: new window.google.maps.Size(40, 40), // Adjust the size
          // }}
          position={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
        />

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
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
                strokeColor: "#FF0000",
                strokeWeight: 5,
              },
            }}
          />
        )}

        <TrafficLayer />
      </GoogleMap>
    </div>
  );
};
export default MapContainer;
