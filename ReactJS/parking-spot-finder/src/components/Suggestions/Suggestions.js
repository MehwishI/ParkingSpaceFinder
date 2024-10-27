import Search from "components/Search/Search";
import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router";
import "./Suggestions.css";
import "components/Search/Search.css";

const Suggestions = (props) => {
  // const location = useLocation();
  //const params = location.state;
  //const predictions = location.state.predictions;
  const predictions = props.predictions;
  const handlePredictionClick = props.handlePredictionClick;
  const placeid = props.placeid;
  const setPlaceId = props.setPlaceId;
  //const [placeid, setPlaceId] = useState("");
  //const handlePredictionClick = location.state.handlePredictionClick;
  // const showSuggestions = props.showSuggestions;
  const onPredictionClick = (description, place_id) => {
    console.log("prediction.description:", description);
    console.log("prediction.place_id:", place_id);

    // setPlaceId(place_id);
    handlePredictionClick(description, place_id);
    // console.log("After setPlaceId:", placeid);
  };
  return (
    <div className="search-results-container">
      <ul className="search-results-list">
        {predictions.map((prediction) => (
          <div>
            <li
              key={prediction.place_id}
              onClick={() =>
                onPredictionClick(prediction.description, prediction.place_id)
              }
              className="search-result-item"
            >
              <i className="fas fa-map-marker-alt  me-2 search-icon-fam"></i>
              <div className="search-result-text">
                <div className="main-text">
                  {prediction.structured_formatting.main_text}
                </div>{" "}
                <div>{prediction.structured_formatting.secondary_text}</div>
              </div>
            </li>
            <hr className="line-style"></hr>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Suggestions;
