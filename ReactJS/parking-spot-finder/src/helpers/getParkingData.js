import React from "react";
import { get } from "request";
const axios = require("axios");

//get ALL Parking data
 export async function getParkingData () {

  try {
    const response = await axios.get(`/api/wpapaystation`);

    if (response.ok) {
      return response.json();

    }
    else {
      console.error("Failed to fetch: ", response.status);
      return null;

    }
  }
  catch (error) {
    console.error("Fetch error in Get parking data (ALL): ", error);
    return null;
  }



}
module.exports= { getParkingData}


