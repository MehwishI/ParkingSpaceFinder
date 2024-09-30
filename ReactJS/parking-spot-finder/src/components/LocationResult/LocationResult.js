// import React, { useState, useEffect } from 'react';
// import { locAllResultSearch } from '../../services/locationResultService';

// const getBaseApi = process.env.REACT_APP_BASE_URL_API;

// const LocationResult = async () => {
//   const [getLocRes, setLocRes] = useState(null);

  useEffect(() => {
    
    console.log("I got yanks...");
    const fetchLocAllRes = async () => {
      try {
        
        const getAllLoc = await locAllResultSearch();
        console.log(getAllLoc);
        
        setLocRes(getAllLoc);

      } catch (error) {
        throw error;
      }
    };

    fetchLocAllRes();
  }, [])

  return (
    <div>LocationResult</div>
  )
}

// export default LocationResult