import React, { useEffect, useState } from "react";
import "./LocationItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParking,
  faCircle,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

//import "@fortawesome/fontawesome-free-solid";

const LocationItem = ({ locationItem }) => {
  // will receive parkdata from  db
  //const { } = props;
  return (
    <div className="loc-container">
      <div className="icon-parkname">
        <div className="icons">
          <FontAwesomeIcon icon={faCircle} size="1.5" />
          <FontAwesomeIcon icon={faGripVertical} />

          <FontAwesomeIcon
            icon={faParking}
            className="parking-icon"
            size="10x"
          />
        </div>
        <div className="street-date">
          <div>
            {locationItem.street}, {locationItem.city}
          </div>
          <div>Parked on: {Date(locationItem.parking_date)}</div>
        </div>
      </div>
      <div className="loc-details">
        <div>Paystation Number: {locationItem.paystation_number}</div>

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
