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
import "./MapLocContainer.css";
import { locResultForCoord } from "../../services/locationResultService";
import CustomMarker from "../FontIcon/FontIcon";
import parkLocIcon from "../../images/SpotlightMarker.png";
import iconmarker from "../../images/marker-pinlet.png";
import spotlighticon from "../../images/SpotlightMarker.png"
import turnright from "../../images/turnright.png";
import { useNavigate } from "react-router";

// const MapContainer = ({ coordinates }) => {
const MapLocContainer = ({
  wpaResData,
  aiSugData,
  onDataChange,
  getAllLocsData,
  directionCoords,
  curCoords,
  destCoord,
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
  const [aiListData, setAiListDate] = useState([]);
  const [getcurrCoords, setCurrCoords] = useState({});
  const navigate = useNavigate();

  const buildCoords = {};

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const blackAndWhiteMapStyle = [
    // {
    //   elementType: 'geometry',
    //   stylers: [{ color: '#f5f5f5' }],
    // },
    // {
    //   elementType: 'labels.text.fill',
    //   stylers: [{ color: '#616161' }],
    // },
    // {
    //   elementType: 'labels.text.stroke',
    //   stylers: [{ color: '#f5f5f5' }],
    // },
    // {
    //   featureType: 'administrative.land_parcel',
    //   elementType: 'labels.text.fill',
    //   stylers: [{ color: '#bdbdbd' }],
    // },
    // {
    //   featureType: 'poi',
    //   elementType: 'geometry',
    //   stylers: [{ color: '#eeeeee' }],
    // },
    // {
    //   featureType: 'poi',
    //   elementType: 'labels.text.fill',
    //   stylers: [{ color: '#757575' }],
    // },
    // {
    //   featureType: 'road',
    //   elementType: 'geometry',
    //   stylers: [{ color: '#ffffff' }],
    // },
    // {
    //   featureType: 'road.arterial',
    //   elementType: 'labels.text.fill',
    //   stylers: [{ color: '#757575' }],
    // },
    // {
    //   featureType: 'road.highway',
    //   elementType: 'geometry',
    //   stylers: [{ color: '#dadada' }],
    // },
    // {
    //   featureType: 'road.local',
    //   elementType: 'labels.text.fill',
    //   stylers: [{ color: '#9e9e9e' }],
    // },
    // {
    //   featureType: 'transit.line',
    //   elementType: 'geometry',
    //   stylers: [{ color: '#e5e5e5' }],
    // },
    // {
    //   featureType: 'water',
    //   elementType: 'geometry',
    //   stylers: [{ color: '#c9c9c9' }],
    // },
  ];

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
      // const getCoordPoints = {
      //   lat: wpaResData.lat,
      //   lng: wpaResData.lng,
      // };

      // const locServiceCoord = await locResultForCoord(getCoordPoints);

      const constLocData = wpaResData.map((item, index) => ({
        lat: Number(item.location.latitude),
        lng: Number(item.location.longitude),
        title: item.street,
        description: `PN: ${item.paystation_number}`,
        accessible_space: item.accessible_space,
        restriction: item.restriction,
        time_limit: item.time_limit,
        total_space: item.total_space,
        mobile_pay_zone: item.mobile_pay_zone
      }));

      console.log("bbb", constLocData);
      

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
    if (wpaResData.length > 0) {
      getAllLocs();
    }
  }, [wpaResData]);

  useEffect(() => {
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
    // when map loads, get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocaton = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // const center = { lat: lat, lng: long };
        if (destCoord) {
          setDefaultCenter(destCoord);
        } else {
          setDefaultCenter(userLocaton);
        }
        onDataChange(destCoord);

        if (map) {
          map.panTo(userLocaton);
          map.setZoom(16);
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

    console.log('const logo', constLocData);


    setLocPoints(constLocData);
  }, [getAllLocsData]);

  useEffect(() => {
    if (destCoord?.parking?.length > 0) {
      const locData = destCoord.parking.map((location, index) => ({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        title: `Marker ${index + 1}`,
      }));

      setLocAiPoints(locData);
    }
  }, [destCoord]);
  // }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  useEffect(() => {
    if (curCoords) {
      setDefaultCenter(curCoords);
    }

    getHandleDrawPoly(directionCoords);
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
    console.log("markr, marker",marker);
    
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

  //   const renderCustMarkersOne = (index) => {
  //     const markerIconOne = `
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
  //   <path fill="#129F4E" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/>
  //   <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="200" fill="white">
  //         ${index}
  //   </text>
  // </svg>
  //   `;

  //     return {
  //       url:
  //         "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(markerIconOne),
  //       scaledSize: new window.google.maps.Size(30, 30),
  //     };
  //   };

  const getHandleClick = (item) => {
    console.log("item list", item);
    
    if (aiListData.parking && aiListData.parking.length > 0) {
      buildCoords.lat = Number(item.coordinates.lat);
      buildCoords.lng = Number(item.coordinates.lng);
    } else {
      buildCoords.lat = item.lat;
      buildCoords.lng = item.lng;
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocaton = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrCoords(userLocaton);
    });

    navigate("/mapdirection", {
      state: { coords: buildCoords, currCoords: getcurrCoords, allItems: item },
    });
  };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="maploccontainer">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        onLoad={handleMapLoad}
        mapTypeId="roadmap"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: blackAndWhiteMapStyle,
        }}
      >
        {getLocPoints.map((locPoints, index) => (
          <>
            <MarkerF
              key={index}
              title={locPoints.title}
              position={{ lat: locPoints.lat, lng: locPoints.lng }}
              animation="DROP"
              onClick={() => handleMarkerClick(locPoints)}
              // icon={renderCustMarkersOne(index + 1)}
              icon={{
                url: spotlighticon,
                scaledSize: new window.google.maps.Size(29, 42),
              }}
            />
          </>
        ))}

        {getLocAiPoints.map((locPoints, index) => (
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
              text: index.toString() + 1,
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
          // icon={{
          //   url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(<CustomMarker />),
          //   scaledSize: new window.google.maps.Size(40, 40), // Adjust the size
          // }}
          position={{ lat: destCoord.lat, lng: destCoord.lng }}
        />
        <MarkerF key="Destination" title="" />

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h3>{activeMarker.title}</h3>
              <p>{activeMarker.description}</p>
              <button onClick={() => getHandleClick(activeMarker)} className="btn btn-success">
                  <img src={turnright} style={{marginRight: '6px'}}/>
                Directions
              </button>
            </div>
          </InfoWindow>
        )}

        {directResp && (
          <DirectionsRenderer
            directions={directResp}
            options={{
              polylineOptions: {
                strokeColor: "#39bb21",
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
export default MapLocContainer;
