import React, { useEffect, useState } from "react";
import "./LocationItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParking,
  faCircle,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import verticalicon from "../../images/Rectangle33.png";
import locIcon from "../../images/weui_location-filled.png";
import eclipse from "../../images/Ellipse 5.png";
import dirIcon from "../../images/Group 30.png";

//import "@fortawesome/fontawesome-free-solid";

const LocationItem = ({ locationItem }) => {
  // will receive parkdata from  db

  //const { } = props;
  return (
    <div className="loc">
      <div className="park-loc-container">
        <div>
          {new Date(locationItem.parking_date).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(locationItem.parking_date).toLocaleString("default", {
            day: "numeric",
          })}
        </div>
        <div className="icon-parkname">
          <div className="icons">
            <img className="eclipse-icon" src={eclipse} />
            <img className="verticalicon" src={verticalicon} />
            <img src={locIcon} />
          </div>

          <div className="street-date">
            <div className="source-add"></div>
            <div>215 St. Mary's road</div>
            <div>Winnipeg, MB, Canada</div>
            <br />
            <div>
              {locationItem.street ? locationItem.street : "Portage Avenue"}{" "}
            </div>
            <div>{locationItem.city}, MB, Canada</div>
          </div>
        </div>
        {/* <div className="loc-details">
        <div>Paystation Number: {locationItem.paystation_number}</div>

        <div>Hourly Rate: {locationItem.hourly_rate}</div>
        <div>Restriction: {locationItem.restriction}</div>
        <div>Time Limit: {locationItem.time_limit}</div>
        {/* <div>{locationItem.total_space}</div>
        <div>{locationItem.accessible_space} </div> */}

        {/* <div>Mobile Pay Zone: {locationItem.mobile_pay_zone}</div>
    </div>  */}
      </div>
      <div>
        <img src={dirIcon} className="diricon"></img>
      </div>
    </div>
  );
};
export default LocationItem;
