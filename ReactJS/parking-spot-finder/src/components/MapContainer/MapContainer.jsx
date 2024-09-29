import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader ,MarkerF} from '@react-google-maps/api';
import './MapContainer.css'

const MapContainer = () => {
  
   var initialCenter = { lat: 48.1, lng: -97.39 }
  const [defaultCenter, setDefaultCenter ] = useState(initialCenter)

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
  console.log("defaultcenter after getting user location:", defaultCenter)
  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
 
  //{ defaultCenter.lat, defaultCenter.lng } = getUserLocation();
  
//   const renderMarkers = (map, maps) => {
//   let marker = new maps.Marker({
//   position: { lat: defaultCenter.lat, lng: defaultCenter.lng },
//   map,
//   title: 'Hello World!'
//   });
//   return marker;
//  };

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
        <MarkerF key="current_location"  title="You are here!"  animation= "DROP" position={{ lat: defaultCenter.lat, lng: -97.1419 }}  />
        </GoogleMap>
      
    </div>
   
  );
}
export default MapContainer
