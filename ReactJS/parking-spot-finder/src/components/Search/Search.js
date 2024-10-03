import React, { useState, useRef, useEffect } from 'react'
import { getGoogleAutocomplete } from 'services/searchService';

const Search = ({ onDataChange }) => {
    const [getAddress, setAddress] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [predictions, setGglePrediction] = useState([]);
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
            
            setGglePrediction(getSearchRes.predictions || []);
        } catch (error) {
            console.error('Error fetching autocomplete suggestions', error);
        }
    };

    const handlePredictionClick = (description) => {
        setInputValue(description);
        setGglePrediction([]);
        onDataChange(description);
    };

    return (
        <>
            <h3>Enter a destination address</h3>
            <input
                type='text'
                value={inputValue}
                onChange={getHandleChange}
                ref={autocompleteRef}
                placeholder='Enter Destination Address'
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
        </>
    )
}

export default Search