import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF , InfoWindow} from '@react-google-maps/api';
import './MapContainer.css'
//import { findCoordinatesByAddress } from ".../helpers/findCoordinates";
import { locAllResultSearch , locResultSearch} from "services/locationResultService";


const MapContainer = () => {
     const initialCenter = { lat: 48.1, lng: -97.39 }
  const [defaultCenter, setDefaultCenter] = useState(initialCenter);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [parkingData, setParkingData] = useState([]);

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
  //console.log(findCoordinatesByAddress("360 Portage Avenue"));
  const markers= []
  const fetchParkingLocations = async () => {
    try {
      const parkingData = await locAllResultSearch();
      console.log(parkingData);
      
      setParkingData(parkingData);
     // setMarkers(parkingData)
      //markers.push(parkingDat)

    }
    catch (error) {
      throw error;
    }
  }
  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
  };  
  
  //const setMarkers = (parkingData) => {
    for (let i of parkingData) {
      let obj = { id: i + 1, position: { lat: parkingData[i].location.latitude, lng: parkingData[i].location.longitude }, info: parkingData[i].paystation_number }
      markers.push(obj);

    }
    console.log("markers:", markers)
  //}
  

  useEffect(() => {

    fetchParkingLocations(); // Getting parking locations
   // setMarkers(parkingData);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const long = position.coords.longitude;
        // const center = { lat: lat, lng: long };
        setDefaultCenter({ lat: latitude, lng: long });
      },
      (error) => {
        console.log(error);
      })
  },[])
    
  // const showPosition = (position) => {
  //   console.log(position)
  //  // console.log(userLocation)
  //   const userLocation = {            
  //         lat: position.coords.latitude,  
  //         lng: position.coords.longitude, 
  //   };
  //   defaultCenter.lat = userLocation.lat;
  //   defaultCenter.lng = userLocation.lng;
  //   console.log("changed defaultcenter:",defaultCenter)
  // }  
 // getUserLocation()
 // console.log("defaultcenter after getting user location:", defaultCenter)
  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
 
  
    // { id: 1, position: { lat: 37.7749, lng: -122.4194 }, info: "San Francisco" },
    // { id: 2, position: { lat: 34.0522, lng: -118.2437 } , info: "Los Angeles"},
    // { id: 3, position: { lat: 40.7128, lng: -74.0060 }, info: "New York" },
    // { id: 4, position:{ lat: defaultCenter.lat, lng: defaultCenter.lng }, info: "You are here" }
  

  return (
    // <LoadScript
    //   googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
    <div className='mapcontainer'>  
    <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
       // onGoogleApiLoaded={renderMarkers(map,maps)}
      >
        {/* <MarkerF key="current_location"  title="You are here!"  animation= "DROP" position={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}  /> */}
        

       {markers.map(marker => (
         <MarkerF key={marker.id} position={marker.position} onClick={()=>onMarkerClick(marker)} />
         
       ))}  
         {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={onCloseInfoWindow}
          >
            
              <h2>{selectedMarker.info}</h2>
            
          </InfoWindow>
        )}
      </GoogleMap>
      
    </div>
   
  );
}
export default MapContainer
