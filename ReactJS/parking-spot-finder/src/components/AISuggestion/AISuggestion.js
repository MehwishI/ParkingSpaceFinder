import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './AISuggestion.css';
import VoiceIndicator from './VoiceIndicator';
import { getEncryptedData, getDecryptedData } from '../../services/encryptdecrypt';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

const jsonData = {
    currentLocAddress: "340 Provencher Blvd, Winnipeg, MB R2H 0G7",
    currentCoordinates: "Lat: 49.89418822548855, Long: -97.11417756985763",
    destLocAddress: "433 St Mary's Rd, Winnipeg, MB R2M 3K7",
    destCoordinates: "Lat: 49.87167903906522, Long: -97.11233221002861"
}

const AISuggestion = () => {
    const [getAudioSource, setAudioSource] = useState(null);
    const [getIsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    const getHandleGenVoice = async () => {
        setIsLoading(true);
        try {
            // encryp data before sending it to the database
            const encryptData = getEncryptedData(jsonData);
            console.log(encryptData);

            const getResp = await axios.post(`${getBaseApi}/generate-ai-voice`, encryptData, {
                responseType: 'blob'
            });

            const getUrl = URL.createObjectURL(getResp.data);

            setAudioSource(getUrl);
        } catch (error) {
            console.error('Error generating voice', error);
            setError('Failed to generate voice. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (getAudioSource && audioRef.current) {
            audioRef.current.play();
        }
    }, [getAudioSource]);

    return (
        <div className='container'>
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
                {getIsLoading ? 'Generating AI Suggestion...' : 'Generate AI Suggestion'}
            </button>
        </div>
    );
}

export default AISuggestion