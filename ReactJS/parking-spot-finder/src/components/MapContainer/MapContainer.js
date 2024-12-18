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
import iconmarker from "../../images/marker-pinlet.png";
import currentLocation from "../../images/CurrentLocationMarker.png";
import destLocIcon from "../../images/SpotlightMarker.png";
import mapNavIcon from "../../images/Group 36.png";

// const MapContainer = ({ coordinates }) => {
const MapContainer = ({
  wpaResData,
  aiSugData,
  onDataChange,
  getAllLocsData,
  directionCoords,
  curCoords,
  onDurationTime,
  currPosition,
  path,
  destCoorNav
}) => {
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
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const isProd = process.env.REACT_APP_ISPROD;

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
  };

  const getAllLocs = async () => {
    try {
      const getCoordPoints = {
        lat: wpaResData.lat,
        lng: wpaResData.lng,
      };

      const locServiceCoord = await locResultForCoord(getCoordPoints);

      const constLocData = locServiceCoord.map((item, index) => ({
        lat: parseFloat(item.location.latitude),
        lng: parseFloat(item.location.longitude),
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
    if (aiSugData === null) {
    } else if (Object.keys(aiSugData).length > 0 && map) {
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
    // when map loads, get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const userLocaton = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        if (isProd === 'false' || false) {
          userLocaton.lat = 49.891270;
          userLocaton.lng = -97.139283;
        };

        // const center = { lat: lat, lng: long };
        setDefaultCenter(userLocaton);

        onDataChange(userLocaton);

        if (map) {
          map.panTo(userLocaton);
          map.setZoom(17);
          // map.setZoom(16);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [map]);

  useEffect(() => {
    if (directResp) {
      const directionCoordinates = {};

      if (isProd === "false" || false) {
        directionCoordinates.lat = 49.89163903407668;
        directionCoordinates.lng = -97.13962168666052;

        getCalcRoute(defaultCenter, directionCoordinates);
      } else {
        getCalcRoute(defaultCenter, directResp);
      }
    }
  }, [directResp]);

  useEffect(() => {
    if (!getAllLocsData) {
      return;
    }

    // check later
    const constLocData = getAllLocsData.map((item, index) => ({
      lat: Number(item.location.latitude),
      lng: Number(item.location.longitude),
      title: `Marker ${index + 1}`,
      description: item.location.description,
    }));

    setLocPoints(constLocData);
  }, [getAllLocsData]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const userLocaton = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        if (isProd === 'false' || false) {
          userLocaton.lat = 49.891270;
          userLocaton.lng = -97.139283;
        };

        // const center = { lat: lat, lng: long };
        setDefaultCenter(userLocaton);

        getHandleDrawPoly(userLocaton, destCoorNav);

        if (map) {
          map.panTo(userLocaton);
          map.setZoom(17);
          // map.setZoom(16);
        }
      },
      (error) => {
        console.log(error);
      }
    )

  }, [map, destCoorNav]);

  useEffect(() => {
    if (curCoords) {
      setDefaultCenter(curCoords);
    }

    getHandleDrawPoly(null, directionCoords);
  }, [map, directionCoords, curCoords]);

  const success = (position) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

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

  const getHandleDrawPoly = async (currLoc, destination) => {
    let currentCoordinate = {};
    if (defaultCenter && destination) {

      currentCoordinate = defaultCenter;

      if (currLoc !== null) {
        if (Object.keys(currLoc).length > 0) {

          currentCoordinate = currLoc;
          // setDefaultCenter(currLoc);
        }
      };

      const dirService = new window.google.maps.DirectionsService();

      const getRes = await dirService.route(
        {
          origin: currentCoordinate,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0].legs[0];

            if (onDurationTime) {
              onDurationTime(route.distance.text, route.duration.text);
            }

            setDistance(route.distance.text);
            setDuration(route.duration.text);
          } else {
            console.error(`error fetching directions`);
          }
        }
      );

      if (getRes.status === "OK") {
        setDirectResp(getRes);
      } else {
        console.error(`Failed to fetch direction`);
      }
    }
  };

  const convertToObject = (jsonData) => {
    if (Object.keys(jsonData).length > 0) {
      const parsedJson = JSON.parse(jsonData);

      return parsedJson;
    } else {
      return;
    }
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

  const renderCustMarkersOne = () => {
    //     const markerIconOne = `
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
    //   <path fill="#129F4E" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/>
    //   <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="200" fill="white">
    //         ${index}
    //   </text>
    // </svg>
    //   `;

    return {
      url: { iconmarker },
      scaledSize: new window.google.maps.Size(30, 30),
    };
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
        mapTypeId="roadmap"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {getLocPoints.map((locPoints, index) => (
          <MarkerF
            key={index}
            title={locPoints.title}
            position={{
              lat: parseFloat(locPoints.lat),
              lng: parseFloat(locPoints.lng),
            }}
            animation="DROP"
            onClick={() => handleMarkerClick(locPoints)}
            icon={{
              url: iconmarker,
              labelOrigin: new window.google.maps.Point(12, 10)
            }}
            label={{
              text: index.toString(),
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
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
          icon={{
            url: currentLocation,
            scaledSize: new window.google.maps.Size(30, 30), // Adjust the size
          }}
          position={{
            lat: parseFloat(defaultCenter.lat),
            lng: parseFloat(defaultCenter.lng),
          }}
        />

        {activeMarker && (
          <InfoWindow
            position={{
              lat: parseFloat(activeMarker.lat),
              lng: parseFloat(activeMarker.lng),
            }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h3>{activeMarker.title}</h3>
              <p>{activeMarker.description}</p>
              <button onClick={() => getHandleDrawPoly(null, activeMarker)}>
                View Details
              </button>
            </div>
          </InfoWindow>
        )}

        {directResp && (
          <MarkerF
            position={directResp.routes[0].legs[0].end_location}
            icon={{
              url: destLocIcon,
              scaledSize: new window.google.maps.Size(29, 42),
            }}
            title="Destination"
          />
        )}

        {directResp && (
          <DirectionsRenderer
            directions={directResp}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#165CE9",
                strokeWeight: 5,
              },
            }}
          />
        )}

        {currPosition && (
          <MarkerF
            key="current_location_nav"
            title="You are here!"
            animation="DROP"
            icon={{
              url: mapNavIcon,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            position={currPosition}
          />
        )}

        {destCoorNav && (
          <MarkerF
            position={destCoorNav}
            icon={{
              url: destLocIcon,
              scaledSize: new window.google.maps.Size(29, 42),
            }}
            title="Destination"
          />
        )}

        {path && (
          <Polyline
            // path={directResp}
            path={directResp}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 6,
              icons: [
                {
                  icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                  offset: '100%',
                  repeat: '20px',
                },
              ],
            }}
          />
        )}

        <TrafficLayer />
      </GoogleMap>
    </div>
  );
};
export default MapContainer;
