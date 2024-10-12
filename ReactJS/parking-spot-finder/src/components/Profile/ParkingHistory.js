import React, { useEffect, useState } from 'react'
import { getUserProfileData } from '../../services/userProfileDataService';

const ParkingHistory = (getUserId) => {
    const [userHistory, setUserHistory] = useState(null);

// useEffect(() => {
//     try {
//         const getUserHist = getUserProfileData(getUserId);

//         setUserHistory(getUserHist) 
//     } catch (error) {
//         console.error(error);
//     }
// });


  return (
    <div>Parking History</div>
  )
}

export default ParkingHistory