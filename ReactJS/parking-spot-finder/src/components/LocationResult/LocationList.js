import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import "./LocationList.css";

const LocationList = ({ wpaLocRes }) => {
  return (
    <div className="home-list-style">
      {wpaLocRes.length > 0 &&
        wpaLocRes.map((item, index) => (
          <div key={item.id} className="list-style">
            <div className="row">
              <div className="col-sm-3 d-flex align-items-center">
                <div>
                  <span className="list-number">{index + 1}</span>
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className="marker-style"
                    color="#129F4E"
                  />
                </div>
                <div className="ms-2">
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
                          {item.hourly_rate}$/hr
                        </div>
                        <div className="space-small">
                          {item.total_space} total spaces
                        </div>
                      </div>
                    </div>
                    <div className="btn-div-style"></div>
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
