import React, { useState, useEffect } from 'react';
import { locAllResultSearch } from '../../services/locationResultService';
import { useLocation } from 'react-router-dom';
import MapContainer from '../MapContainer/MapContainer';

const LocationResult = () => {

  const getLocation = useLocation();

  console.log("location state", getLocation.state);
  
  const { address, coordinates } = getLocation.state || {};

  return (
    <>
      <MapContainer coordinates={coordinates}/>
      <div>LocationResult</div>
      {address}
    </>
)
}

export default LocationResult