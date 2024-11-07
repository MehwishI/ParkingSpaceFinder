import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMapMarker,
  faMapLocationDot,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { MdOutlineTurnRight } from "react-icons/md";
//import parkingicon from "../../images/Line 23.png/";
import parkingicon from "../../images/Line 23.png";
import filtericon from "../../images/ion_filter.png";
import crossicon from "../../images/basil_cross-outline.png";
import rectangle from "../../images/Rectangle 40.png";
import diricon from "../../images/Frame 20.png";
import "./LocationList.css";

const LocationList = ({ wpaLocRes, getAIResDetails }) => {
  const [getcurrCoords, setCurrCoords] = useState({});
  const [toggleListOpen, setToggleListOpen] = useState(true);
  const [sortby, setSortBy] = useState(null);
  const [data, setData] = useState(wpaLocRes);
  const [field, setField] = useState(null);
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
  useEffect(() => {
    // Update data when wpaLocRes changes
    setData(wpaLocRes);
  }, [wpaLocRes]);

  useEffect(() => {
    console.log("AI data details", getAIResDetails);
  }, [getAIResDetails])

  useEffect(() => {
    const sortData = (type) => {
      const types = {
      };
      let sorted = [...data];
      if (type === "") {
        setSortBy(null);
        setField(null);
      }
      if (type)
        switch (type) {
          case "hr-dec":
            sorted.sort(
              (a, b) => parseFloat(b.hourly_rate) - parseFloat(a.hourly_rate)
            );
            setField("Price");
            break;

          case "hr-inc":
            sorted.sort(
              (a, b) => parseFloat(a.hourly_rate) - parseFloat(b.hourly_rate)
            );
            setField("Price");

            break;
          case "sp-dec":
            sorted.sort(
              (a, b) => parseFloat(b.total_space) - parseFloat(a.total_space)
            );
            setField("Capacity");
            break;
          case "sp-inc":
            sorted.sort(
              (a, b) => parseFloat(a.total_space) - parseFloat(b.total_space)
            );
            setField("Capacity");
            break;
          default:
            setSortBy(null);
            setField(null);
            break;
        }
      setData(sorted);
    };
    sortData(sortby);
  }, [sortby]);

  const handleCloseClick = (e) => {
    setSortBy(null);
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
        <div className="drop-filter">
          <img src={filtericon} />
            {/* <select>
              <option className="sort-option" value="hourly_rate">
                Price
              </option>

              <option className="sort-option" value="spaces">
                Capacity
              </option>
            </select> */}
          {/* </img> */}
        </div>
        &nbsp;&nbsp;
        <div>
          <div className="sort-dropdown">
            <select value={sortby} onChange={(e) => setSortBy(e.target.value)} className="form-control" style={{width: '87px'}}>
              <option className="sort-option" value="">
                Sort by
              </option>
              <option className="sort-option" value="hr-dec">
                Price - Highest to Lowest
              </option>
              <option className="sort-option" value="hr-inc">
                Price - Lowest to Highest
              </option>
              <option className="sort-option" value="sp-dec">
                Capacity - Highest to Lowest
              </option>
              <option className="sort-option" value="sp-inc">
                Capacity - Lowest to Highest
              </option>
            </select>
          </div>
          &nbsp;&nbsp;
        </div>
        &nbsp;&nbsp;
        {field && (
          <div className="sort-type-field">
            {field}
            <div className="div-cross-icon" onClick={() => setSortBy("")}>
              <img src={crossicon} alt="close" />
            </div>
          </div>
        )}
      </div>
      <div className="list-box">
        {data.length > 0 ? (
          data.map((item, index) => (
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
                      {/* <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className="parking-icon"
                        color="#129F4E"
                      /> */}
                      <img src={rectangle} height="120px"></img>
                    </div>

                    <div className="ms-2 details-box">
                      <div className="d-flex  side-containers box">
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
                            {/* <MdOutlineTurnRight /> */}
                            <img src={diricon}></img>
                          </div>
                          {/* &nbsp;
                          <span>Directions</span> */}
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
