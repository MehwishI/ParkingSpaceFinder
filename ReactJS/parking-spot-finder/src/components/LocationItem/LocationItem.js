import React, { useEffect, useState } from "react";

const LocationItem = ({ locationItem }) => {
  // will receive parkdata from  db
  //const { } = props;
  return (
    <div className="loc-container">
      <div>
        Address: {locationItem.street}, {locationItem.city}
      </div>

      <div>Paystation Number:{locationItem.paystation_number}</div>
      <div>
        <div>Date Parked:{locationItem.parking_date}</div>
        <div>Hourly Rate: {locationItem.hourly_rate}</div>
        <div>Restriction: {locationItem.restriction}</div>
        <div>Time Limit: {locationItem.time_limit}</div>
        {/* <div>{locationItem.total_space}</div>
        <div>{locationItem.accessible_space} </div> */}

        <div>Mobile Pay Zone: {locationItem.mobile_pay_zone}</div>
      </div>
    </div>
  );
};
export default LocationItem;
