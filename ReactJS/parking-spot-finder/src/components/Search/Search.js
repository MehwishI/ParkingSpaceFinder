import React, { useState, useRef, useEffect } from "react";
import { getGoogleAutocomplete } from "services/searchService";
import { getGoogleCoordinates } from "services/getCoordinatesService";

import { useAsyncError } from "react-router";

const Search = ({ onDataChange }) => {
  //const [getAddress, setGetAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [placeid, setPlaceId] = useState("");
  const [predictions, setGglePrediction] = useState([]);
  const [addressCoord, setAddressCoord] = useState(null);
  const autocompleteRef = useRef(null);

  const addressCoordinate = {};

  const getHandleChange = (e) => {
    setInputValue(e.target.value);
    fetchAutoCompleteSuggestion(e.target.value);
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
  };

  const handleClickSubmit = async () => {
    const coordinates = await getGoogleCoordinates(placeid);
    setAddressCoord(coordinates);
    if (coordinates !== null) {
        addressCoordinate.destLocAddress = inputValue;
        addressCoordinate.lat = coordinates.lat;
        addressCoordinate.lng = coordinates.lng;
        
        onDataChange(addressCoordinate);
    }
  }

  return (
    <>
      <h3>Enter a destination address</h3>
      <input
        type="text"
        value={inputValue}
        onChange={getHandleChange}
        ref={autocompleteRef}
        placeholder="Enter Destination Address"
      />
      <ul>
        {predictions.map((prediction) => (
          <li
            key={prediction.place_id}
            onClick={() =>
              handlePredictionClick(prediction.description, prediction.place_id)
            }
          >
            {prediction.description}
          </li>
        ))}
      </ul>
      <button onClick={handleClickSubmit}>Submit</button>
      {/* <button title="searchbtn" onClick={() => OnSearchClick()}>
        Search
      </button> */}
    </>
  );
};

export default Search;
