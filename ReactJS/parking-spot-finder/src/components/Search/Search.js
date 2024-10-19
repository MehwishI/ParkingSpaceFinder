import React, { useState, useRef, useEffect } from "react";
import { getGoogleAutocomplete } from "services/searchService";
import { getGoogleCoordinates } from "services/getCoordinatesService";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css';
import { useAsyncError } from "react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import { useAsyncError, useNavigate } from "react-router";
import Suggestions from "components/Suggestions/Suggestions";

const Search = ({ onDataChange }) => {
  //const [getAddress, setGetAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [placeid, setPlaceId] = useState("");
  const [predictions, setGglePrediction] = useState([]);
  const [addressCoord, setAddressCoord] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);

  const addressCoordinate = {};

  const getHandleChange = (e) => {
    setInputValue(e.target.value);
    fetchAutoCompleteSuggestion(e.target.value);
    setShowSuggestions(true);
  };

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
  };

  const handleClickSubmit = async () => {
    getCoordinatePoints(placeid);
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
          {/* <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /> */}
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="back-arrow" />
            <input
              type="text"
              value={inputValue}
              onChange={getHandleChange}
              ref={autocompleteRef}
              placeholder="Enter Destination Address"
            />
          </div>
          {/* </div> */}

          <Suggestions
            predictions={predictions}
            handlePredictionClick={handlePredictionClick}
            showSuggestions={showSuggestions}
          />
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
