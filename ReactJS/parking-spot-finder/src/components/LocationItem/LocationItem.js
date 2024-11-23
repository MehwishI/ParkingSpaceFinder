import React, { useEffect, useState } from "react";
import "./LocationItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

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
  const [getcurrCoords, setCurrCoords] = useState({});
  const navigate = useNavigate();

  const buildCoords = {};

  const getHandleClick = (item) => {
    buildCoords.lat = item.locLatitude.$numberDecimal;
    buildCoords.lng = item.locLongitude.$numberDecimal;
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocaton = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrCoords(userLocaton);
    });

    navigate("/mapdirection", {
      state: { coords: buildCoords, currCoords: getcurrCoords, allItems: item },
    });
  };
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
      </div>
      <div onClick={() => getHandleClick(locationItem)}>
        <img src={dirIcon} className="diricon"></img>
      </div>
    </div>
  );
};
export default LocationItem;
