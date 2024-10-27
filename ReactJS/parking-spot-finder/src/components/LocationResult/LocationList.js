import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMapMarker,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { MdOutlineTurnRight } from "react-icons/md";
import "./LocationList.css";

const LocationList = ({ wpaLocRes }) => {
  // const [fetchCoords, setCoords] = useState();
  console.log(wpaLocRes);
  const [getcurrCoords, setCurrCoords] = useState({});
  const navigate = useNavigate();

  const buildCoords = {};
  const getHandleClick = (item) => {
    buildCoords.lat = item.location.latitude;
    buildCoords.lng = item.location.longitude;
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocaton = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrCoords(userLocaton);
    });

    navigate("/mapdirection", {
      state: { coords: buildCoords, currCoords: getcurrCoords },
    });
  };
  return (
    <div className="loc-list">
      <hr className="horizontal-rule"></hr>
      {wpaLocRes.length > 0 &&
        wpaLocRes.map((item, index) => (
          <div key={item.id} className="list-style-box">
            <div className="row">
              <div className="col-sm-3 d-flex align-items-center">
                <div>
                  <span className="list-number">{index + 1}</span>
                  {/* <FontAwesomeIcon
                    icon={faMapMarker}
                    className="marker-style"
                  /> */}
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="parking-icon"
                    color="#129F4E"
                  />
                </div>

                <div className="ms-2 details-box">
                  <div className="d-flex align-items-center side-containers">
                    <div>
                      <div className="overlay-text-top">
                        <b>{item.street}</b>
                      </div>
                      <div className="overlay-text-bottom">
                        {item.time_limit}
                      </div>
                      <div className="d-flex lower-info-boxes">
                        <div className="address-small">
                          PN: {item.paystation_number}
                        </div>
                        <div className="price-small">
                          ${item.hourly_rate}/hour
                        </div>
                        <div className="space-small">
                          {item.total_space} spaces
                        </div>
                      </div>
                    </div>
                    <div className="btn-dir-style">
                      <div
                        onClick={() => getHandleClick(item)}
                        className="arrow-dir"
                      >
                        <MdOutlineTurnRight />
                      </div>
                      <span>Directions</span>
                    </div>
                  </div>
                  <div className="btn-dir-style">
                    <div
                      onClick={() => getHandleClick(item)}
                      className="arrow-dir"
                    >
                      <MdOutlineTurnRight />
                    </div>
                    &nbsp;
                    <span>Directions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default LocationList;
