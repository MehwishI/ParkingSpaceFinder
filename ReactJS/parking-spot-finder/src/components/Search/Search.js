import React, { useState, useRef, useEffect } from "react";
import { getGoogleAutocomplete } from "services/searchService";

import { useAsyncError } from "react-router";

const Search = ({ onDataChange }) => {
  const [getAddress, setGetAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [predictions, setGglePrediction] = useState([]);
  const [addressCoord, setAddressCoord] = useState({});
  const autocompleteRef = useRef(null);

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
      setGglePrediction(getSearchRes.predictions || []);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions", error);
    }
  };

  const handlePredictionClick = (description) => {
    setInputValue(description);
    setGglePrediction([]);
    onDataChange(description);
  };
  const OnSearchClick = async () => {
    //get coordinates
    // setGetAddress(inputValue);
    // console.log("getAddress:", getAddress);
    // console.log(inputValue);
    // console.log("getAddress:", getAddress);
    // const data = await getCoordinatesByAddress("393 Portage Avenue");
    // console.log(data);
    // // console.log("getAddress:", getAddress);
    // const coordinates = data.geometry.location;
    // setAddressCoord(coordinates);
    // console.log(coordinates);
  };

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
            onClick={() => handlePredictionClick(prediction.description)}
          >
            {prediction.description}
          </li>
        ))}
      </ul>
      <button title="searchbtn" onClick={() => OnSearchClick()}>
        Search
      </button>
    </>
  );
};

export default Search;
