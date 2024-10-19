import Search from "components/Search/Search";
import React, { useEffect, useState } from "react";

const Suggestions = (props) => {
  const predictions = props.predictions;
  const handlePredictionClick = props.handlePredictionClick;
  const showSuggestions = props.showSuggestions;
  return (
    <div className="search-results-container">
      <ul className="search-results-list">
        {predictions.map((prediction) => (
          <li
            key={prediction.place_id}
            onClick={() =>
              handlePredictionClick(prediction.description, prediction.place_id)
            }
            className="search-result-item"
          >
            <i className="fas fa-map-marker-alt text-danger me-2 search-icon-fam"></i>
            <div className="search-result-text">{prediction.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Suggestions;
