import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [getAddress, setAddress] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [predictions, setGglePrediction] = useState([]);
    const autocompleteRef = useRef(null);
    const navigate = useNavigate();
    const getApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const getGglBaseUrl = process.env.REACT_APP_GOOGLE_API_BASE_URL;


    // const getCoordinates = async () => {
    //     if (!getAddress) {
    //         return "Please enter an address;";
    //     };

    //     try {
    //         const getResp = await axios.get(
    //             `${getGglBaseUrl}/geocode/json?address=${encodeURIComponent(
    //                 getAddress
    //             )}&key=${getApiKey}`
    //         );

    //         console.log("status is: ",getResp.data.status);
            

    //         if (getResp.data.status === "OK") {
    //             const getFormAddress = getResp.data.results[0].formatted_address;
    //             const getAddressCood = getResp.data.results[0].geometry.location;

    //             console.log("from search",getAddress);
                
    //             navigate("/locationresult", {
    //                 state: {
    //                     address: getFormAddress,
    //                     coordinates: getAddressCood
    //                 }
    //             });
    //         };

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        const getLoadGoogleMapsScr = () => {
            const script = document.createElement('script');
            // script.src = `${getGglBaseUrl}/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${getApiKey}}`;
            script.src = `${getGglBaseUrl}/js?key=${getApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (autocompleteRef.current) {
                    const autocomplete = new window.google.maps.places.Autocomplete(
                        autocompleteRef.current,
                        {
                            types: ['geocode']
                        }
                    );

                    autocomplete.addListener("place_changed", () => {
                        const place = autocomplete.getPlace();
                        if (place.geometry) {
                            navigate("/locationresult", {
                                state: {
                                    address: place.formatted_address,
                                    coordinates: {
                                        lat: place.geometry.location.lat(),
                                        lng: place.geometry.location.lng(),
                                    } 
                                }
                            })
                        }
                    })
                }
            }
        };

        getLoadGoogleMapsScr();
    }, [navigate]);

    const getHandleChange = (e) => {
        setInputValue(e.target.value);
        fetchAutoCompleteSuggestion(e.target.value);
    };

    const fetchAutoCompleteSuggestion = async (getInput) => {
        if (!getInput) {
            setGglePrediction([]);
        }

        try {
            const getResp = await axios.get(
                `${getGglBaseUrl}/place/autocomplete/json?input=${encodeURIComponent(getInput)}&key=${getApiKey}`
            );
            const getData = await getResp.json();
            setGglePrediction(getData.predictions || []);
        } catch (error) {
            console.error('Error fetching autocomplete suggestions', error);
        }
    };

    const handlePredictionClick = (description) => {
        setInputValue(description);
        setGglePrediction([]);
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
                   <li key={prediction.place_id} onClick={() => handlePredictionClick(prediction.description)}>
                    {prediction.description}
                   </li> 
                ))}
            </ul>
            {/* <button onClick={getCoordinates}>Submit</button> */}
        </>
    )
}

export default Search