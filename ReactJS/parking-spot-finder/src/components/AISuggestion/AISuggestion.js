import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './AISuggestion.css';
import VoiceIndicator from './VoiceIndicator';
import { getEncryptedData, getDecryptedData } from '../../services/encryptdecrypt';
import { useAuth0 } from '@auth0/auth0-react';
import speakIcon from "../../images/ant-design_sound-filled.png";
import { useLocation } from 'react-router';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

// const jsonData = {
//     currentLocAddress: "340 Provencher Blvd, Winnipeg, MB R2H 0G7",
//     currentCoordinates: "Lat: 49.89418822548855, Long: -97.11417756985763",
//     destLocAddress: "433 St Mary's Rd, Winnipeg, MB R2M 3K7",
//     destCoordinates: "Lat: 49.87167903906522, Long: -97.11233221002861"
// }

const jsonData = {}

const AISuggestion = ({ onDataChange, getDestLoc, getCurrLoc, destCoord }) => {
    const [getAudioSource, setAudioSource] = useState(null);
    const [getIsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    const [getAiText, setAiText] = useState('');
    const [coordsAddState, setCoordsState] = useState(null);
    const [destiCoord, setDestCoord] = useState(null);

    const { getAccessTokenSilently } = useAuth0();

    const getHandleGenVoice = async () => {
        setIsLoading(true);
        try {

            // check that object is not empty
            // if (Object.keys(jsonData).length === 0) {
            //     return "Data cannot be empty";
            // };

            // append current location before sending to api
            console.log("is it true",coordsAddState);
            if (coordsAddState !== null) {
                getCurrLoc.lat = coordsAddState.getCurrLocAdd.lat;
                getCurrLoc.lng = coordsAddState.getCurrLocAdd.lng;
            };

            jsonData.currentAddress = "";
            jsonData.currentCoordinates = `Lat: ${getCurrLoc.lat}, Long: ${getCurrLoc.lng}`;
            jsonData.destLocAddress = getDestLoc.destLocAddress;
            jsonData.destCoordinates = `Lat: ${getDestLoc.lat}, Long: ${getDestLoc.lng}`;

            // return;
            // get auth token
            const getAuth0Tok = await getAccessTokenSilently();
            
            // encrypt data before sending it to the database
            const encryptData = getEncryptedData(jsonData);

            const getResp = await axios.post(`${getBaseApi}/generate-ai-voice`, encryptData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuth0Tok}`
                }
            });

            const { text, txtJson, audio } = getResp.data;
            setAiText(text);

            onDataChange(txtJson);

            const getAudioBlob = new Blob([new Uint8Array(atob(audio).split("").map(c => c.charCodeAt(0)))], { type: 'audio/mpeg' });

            const getUrl = URL.createObjectURL(getAudioBlob);

            setAudioSource(getUrl);
        } catch (error) {
            console.error('Error generating voice', error);
            setError('Failed to generate voice. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCoordsState(getCurrLoc);
    },[getCurrLoc]);

    useEffect(() => {
        console.log("ffddss", destCoord);
        
        setDestCoord(destCoord);
    },[destCoord]);

    useEffect(() => {

        if (getAudioSource && audioRef.current) {
            audioRef.current.play();
        }
    }, [getAudioSource]);

    return (
        <>
            {getIsLoading && (
                <div className='spinner'>
                    <ClipLoader size={20} color={"#000"} loading={getIsLoading} />
                </div>
            )}
            {error && <div className="error">{error}</div>}
            {getAudioSource && (
                <>
                    <VoiceIndicator />
                    <audio ref={audioRef} controls>
                        <source src={getAudioSource} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </>
            )}

            <button onClick={getHandleGenVoice} disabled={getIsLoading} className='button-gen'>
                <img src={speakIcon} style={{ marginRight: '5px' }} />
                {getIsLoading ? 'Please wait...' : 'AI Suggest'}
            </button>

            {getAiText && (
                <>
                    <a>
                        {String(getAiText)}
                    </a>
                </>
            )}
        </>
    );
}

export default AISuggestion