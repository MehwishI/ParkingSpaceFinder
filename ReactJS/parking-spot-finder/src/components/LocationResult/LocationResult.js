import React, { useState, useEffect } from 'react';
import { locAllResultSearch } from '../../services/locationResultService';

const LocationResult = () => {
  const [getLocRes, setLocRes] = useState(null);

  useEffect(() => {
    const fetchLocAllRes = async () => {
      try {
        const getAllLoc = await locAllResultSearch();
        console.log(getAllLoc);
        setLocRes(getAllLoc);
      } catch (error) {
        console.error("Error fetching location results:", error);
      }
    };

    fetchLocAllRes();
  }, []);

  return (
    <>
      <div>LocationResult</div>
      {getLocRes ? (
        <ul>
          {getLocRes.map((loc, index) => (
            <>
              <li key={index}>Latitude: {loc.location.latitude}</li>
              <li key={index}>Longitude: {loc.location.longitude}</li>
              <br></br>
            </>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default LocationResult