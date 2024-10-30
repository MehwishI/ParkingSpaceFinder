import React, { useState, useRef, useEffect } from "react";
import { getGoogleAutocomplete } from "services/searchService";
import { getGoogleCoordinates } from "services/getCoordinatesService";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import { useAsyncError, useNavigate } from "react-router";
import Suggestions from "components/Suggestions/Suggestions";
import MapContainer from "components/MapLocContainer/MapLocContainer";
import LocationResult from "components/LocationResult/LocationResult";

const Search = ({
  onDataChange,
  backgroundColor,
  marginLeft,
  isHomeScreen,
  searchInput,
}) => {
  //const [getAddress, setGetAddress] = useState("");
  const [inputValue, setInputValue] = useState(searchInput);
  const [placeid, setPlaceId] = useState("");
  const [predictions, setGglePrediction] = useState([]);
  const [addressCoord, setAddressCoord] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const autocompleteRef = useRef(null);
  const [changeBackgroundColor, setBackgrundColor] = useState(backgroundColor);

  const addressCoordinate = {};
  const navigate = useNavigate();
  //let showR = false;

  const fetchAutoCompleteSuggestion = async (getInput) => {
    if (!getInput) {
      setGglePrediction([]);
    }

    try {
      const getSearchRes = await getGoogleAutocomplete(getInput);

      //get place ID
      await setGglePrediction(getSearchRes.predictions || []);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions", error);
    }
  };

  const handlePredictionClick = (description, place_id) => {
    // console.log("reached parent with:", description, place_id);
    setInputValue(description);
    setPlaceId(place_id);
    setGglePrediction([]);
    getCoordinatePoints(place_id);
    setShowSuggestions(false);
    // setShowResult(true);
    //showR = true;
    // console.log("After setPlaceId in parent comp:", placeid);
  };
  // useEffect(() => {
  //   console.log("placeid updated:", placeid);

  //   console.log("showResult updated:", showResult);
  //   // getCoordinatePoints(placeid);
  // }, [placeid, showResult]);

  // useEffect(() => {
  //   setBackgrundColor(changeBackgroundColor);
  // }, [changeBackgroundColor]);

  const getHandleChange = (e) => {
    setBackgrundColor("none");
    setInputValue(e.target.value);
    fetchAutoCompleteSuggestion(e.target.value);
    if (e.target.value !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setShowResult(true);
    }
  };

  const handleClickSubmit = async () => {
    getCoordinatePoints(placeid);
    setShowResult(true);
  };

  const handleArrowClick = () => {
    setShowSuggestions(false);
    setInputValue("");
    navigate("/");
  };
  const getCoordinatePoints = async (getPlaceForId) => {
    // console.log("in getCooridnates, placeid:", getPlaceForId);
    const response = await getGoogleCoordinates(getPlaceForId);

    // console.log("response received in getCoordinatePoints:", response);
    // const coordinates = response.data;

    // console.log("After setAddressCoord:", addressCoord);
    if (response) {
      // console.log("1", showResult);
      // showR = true;
      // await setShowResult(true);
      // console.log("2", showR);

      setAddressCoord(response);
      addressCoordinate.destLocAddress = inputValue;
      addressCoordinate.lat = response.lat;
      addressCoordinate.lng = response.lng;

      //  onDataChange(addressCoordinate);
      console.log("addressCoordinate in Search:", addressCoordinate);
      // console.log("showResult:", showResult);
      navigate("/locationresult", {
        state: {
          addressCoordinate: { addressCoordinate },
          searchInput: { inputValue },
        },
      });
    }
  };

  return (
    <>
      <div
        className="row outer-div-style"
        style={{ backgroundColor: changeBackgroundColor }}
      >
        <div className="col-md-9 search-bar-outer">
          {/* <div className="inp-contain"> */}
          <div className="search-bar" style={{ marginLeft: marginLeft }}>
            {showSuggestions ? (
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={handleArrowClick}
                  className="icon-styles"
                />
              </span>
            ) : isHomeScreen ? (
              <span>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={handleArrowClick}
                  size="1.5x"
                />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={handleArrowClick}
                  size="1.5x"
                />
              </span>
            )}
            {/* {showSuggestions ? (
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={handleArrowClick}
                  size="1.5x"
                />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={handleArrowClick}
                  className="icon-styles"
                />
              </span>
            )} */}
            &nbsp;
            <input
              type="text"
              value={inputValue}
              onChange={getHandleChange}
              ref={autocompleteRef}
              placeholder="Search Location"
            />
          </div>
          {showSuggestions && (
            <div className="suggestions-container">
              {" "}
              <Suggestions
                predictions={predictions}
                handlePredictionClick={handlePredictionClick}
              />
            </div>
          )}

          {/* {showR && (
            <div className="loc-container">
              {" "}
              <div>Hi {showR}</div>
              <LocationResult addressCoordinate={addressCoordinate} />
            </div>
          )} */}
          {/* <ul className="search-results-list">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() =>
                  handlePredictionClick(
                    prediction.description,
                    prediction.place_id
                  )
                }
                className="search-result-item"
              >
                <i className="fas fa-map-marker-alt text-danger me-2 search-icon-fam"></i>
                <div className="search-result-text">
                  {prediction.description}
                </div>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="col-md-3 hide-btn">
          <button
            onClick={handleClickSubmit}
            className="btn btn-primary hide-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
