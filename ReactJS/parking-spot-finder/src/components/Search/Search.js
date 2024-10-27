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
import MapContainer from "components/MapContainer/MapContainer";
import LocationResult from "components/LocationResult/LocationResult";

const Search = ({ onDataChange }) => {
  //const [getAddress, setGetAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [placeid, setPlaceId] = useState("");
  const [predictions, setGglePrediction] = useState([]);
  const [addressCoord, setAddressCoord] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const autocompleteRef = useRef(null);

  const addressCoordinate = {};
  const navigate = useNavigate();

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
    setInputValue(description);
    setPlaceId(place_id);
    setGglePrediction([]);
    getCoordinatePoints(placeid);
    setShowSuggestions(false);
    setShowResult(true);
  };
  const getHandleChange = (e) => {
    setInputValue(e.target.value);
    fetchAutoCompleteSuggestion(e.target.value);
    if (e.target.value !== "") {
      setShowSuggestions(true);
    } else setShowSuggestions(false);
    // return (
    //   <Suggestions
    //     predictions={predictions}
    //     handlePredictionClick={handlePredictionClick}
    //   />
    //);
    // navigate("/suggestions", {
    //   state: {
    //     predictions: predictions,
    //   },
    // });
    // return (
    // <div className="suggestions-container">
    //   {" "}
    //   <Suggestions
    //     predictions={predictions}
    //     handlePredictionClick={handlePredictionClick}
    //   />
    // </div>
    // );
  };

  const handleClickSubmit = async () => {
    getCoordinatePoints(placeid);
  };

  const handleArrowClick = () => {
    setShowSuggestions(false);
    setInputValue("");
    navigate("/");
  };
  const getCoordinatePoints = async (getPlaceForId) => {
    const coordinates = await getGoogleCoordinates(getPlaceForId);
    setAddressCoord(coordinates);
    if (coordinates !== null) {
      addressCoordinate.destLocAddress = inputValue;
      addressCoordinate.lat = coordinates.lat;
      addressCoordinate.lng = coordinates.lng;

      onDataChange(addressCoordinate);
    }
  };

  return (
    <>
      <div className="row outer-div-style">
        <div className="col-md-9 search-bar-outer">
          {/* <div className="inp-contain"> */}
          <div className="search-bar">
            {showSuggestions ? (
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
            )}
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

          {showResult && (
            <LocationResult
              addressCoord={addressCoord}
              onDataChange={onDataChange}
            />
          )}
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
