import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMapMarker,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { MdOutlineTurnRight } from "react-icons/md";
//import parkingicon from "../../images/Line 23.png/";
import parkingicon from "../../images/Line 23.png";
import "./LocationList.css";

const LocationList = ({ wpaLocRes }) => {
  // const [fetchCoords, setCoords] = useState();
  // console.log(wpaLocRes);
  const [getcurrCoords, setCurrCoords] = useState({});
  const [toggleListOpen, setToggleListOpen] = useState(true);
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
      state: { coords: buildCoords, currCoords: getcurrCoords, allItems: item },
    });
  };
  const getHideClick = () => {
    toggleListOpen ? setToggleListOpen(false) : setToggleListOpen(true);
  };
  return (
    <div className={toggleListOpen ? "loc-list" : "loc-list-closed"}>
      <hr
        className="hr-style"
        onClick={() => {
          getHideClick();
        }}
      />
      <div className="div-filter-box">
        <div>
          <FontAwesomeIcon icon={["fas", "bars-filter"]} />
        </div>
        <div>b</div>
        <div>c</div>
      </div>
      <div className="list-box">
        {wpaLocRes.length > 0 ? (
          wpaLocRes.map((item, index) => (
            <div>
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
                              ${item.hourly_rate}/hr
                            </div>
                            <div className="space-small">
                              {item.total_space} spaces
                            </div>
                          </div>
                        </div>
                        <div
                          className="btn-dir-style"
                          onClick={() => getHandleClick(item)}
                        >
                          <div className="arrow-dir">
                            <MdOutlineTurnRight />
                          </div>
                          &nbsp;
                          <span>Directions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line-divider-box">
                <img src={parkingicon} className="line-divider"></img>
              </div>
            </div>
          ))
        ) : (
          <div className="label">
            No parking locations found around this address.
          </div>
        )}
      </div>
    </div>
  );
};
export default LocationList;
