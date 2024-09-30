import React from "react";
import { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import "./MapContainer.css";
import { locAllResultSearch } from "../../services/locationResultService";

const MapContainer = () => {
  const [getLocPoints, setLocPoints] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  let initialCenter = { lat: 48.1, lng: -97.39 };
  const [defaultCenter, setDefaultCenter] = useState(initialCenter);

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
  // const onMarkerClick = (marker) => {
  //   setSelectedMarker(marker);

  // };
  // const onCloseInfoWindow = () => {
  //   setSelectedMarker(null);
  // };

  const getAllLocs = async () => {
    try {
      const locServiceAll = await locAllResultSearch();
      //  console.log("posty",locServiceAll);

      const constLocData = locServiceAll.map((item, index) => ({
        lat: Number(item.location.latitude),
        lng: Number(item.location.longitude),
        title:
          `${item.street}` +
          "\n" +
          `Time Limit: ${item.time_limit}` +
          "\n" +
          `Total space: ${item.total_space}` +
          "\n" +
          `Hourly rate: $${item.hourly_rate}`,
      }));

      //console.log("lojuk",constLocData);

      setLocPoints(constLocData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const long = position.coords.longitude;
        // const center = { lat: lat, lng: long };
        setDefaultCenter({ lat: latitude, lng: long });
      },
      (error) => {
        console.log(error);
      }
    );

    getAllLocs();
  }, []);

  console.log("defaultcenter after getting user location:", defaultCenter);
  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mapcontainer">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {getLocPoints.map((locPoints, index) => (
          <MarkerF
            key={index}
            title={locPoints.title}
            position={{ lat: locPoints.lat, lng: locPoints.lng }}
            animation="DROP"
            info={locPoints.title}
            onClick={() => setSelectedMarker(locPoints)}
          >
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <h2>{selectedMarker.title}</h2>
              </InfoWindow>
            )}
          </MarkerF>
        ))}

        <MarkerF
          key="curr_loc"
          title="You are here!"
          animation="DROP"
          position={{ lat: defaultCenter.lat, lng: -97.1419 }}
          onClick={() => setSelectedMarker(this)}
        />

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <h2>{selectedMarker.title}</h2>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
export default MapContainer;
