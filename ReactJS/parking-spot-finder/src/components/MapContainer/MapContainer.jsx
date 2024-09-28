import React from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import './MapContainer.css'

const  MapContainer = () => {

  const { isLoaded } = useJsApiLoader({
     id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
   });
  
  const mapStyles = {
    height: "700px",
    width: "800px",
    position: "relative",
    overflow: "none",
   align : "center"
   // justify-content: "center"
  };
// var userLocation ={}
  var defaultCenter = {
    lat: 49.3851, lng: -97.1734
  };
 
 if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const getUserLocation = () => {
    // console.log(navigator.geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
      return null;
    }
  }
  const showPosition = (position) => {
    console.log(position)
   // console.log(userLocation)
    const userLocation = {            
          lat: position.coords.latitude,  
          lng: position.coords.longitude, 
    };
    defaultCenter.lat = userLocation.lat;
    defaultCenter.lng = userLocation.lng;
    console.log(defaultCenter)
  }  
  
  
 
getUserLocation()

  return (
    // <LoadScript
    //   googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
    <div className='mapcontainer'>  
    <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter} />
      </div>
    //</LoadScript>
  );
}
export default MapContainer
