import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './AISuggestion.css';
import VoiceIndicator from './VoiceIndicator';
import { getEncryptedData, getDecryptedData } from '../../services/encryptdecrypt';
import { useAuth0 } from '@auth0/auth0-react';
import speakIcon from "../../images/ant-design_sound-filled.png";
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const getBaseApi = process.env.REACT_APP_BASE_URL_API;

// const jsonData = {
//     destLocAddress: "433 St Mary's Rd, Winnipeg, MB R2M 3K7",
//     destCoordinates: "Lat: 49.87167903906522, Long: -97.11233221002861"
// }

const jsonData = {}

const AISuggestion = ({ onDataChange, getCurrLoc, locRealAdd }) => {
    const [getAudioSource, setAudioSource] = useState(null);
    const [getIsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    const [getAiText, setAiText] = useState('');
    const [coordsAddState, setCoordsState] = useState(null);
    const [destiCoord, setDestCoord] = useState(null);
    const [getTextAddress, setTextAddress] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playState, setPlayState] = useState('stopped');
    const [scrollPosition, setScrollPosition] = useState(0);
    const textRef = useRef(null);
    const [openIsModal, setOpenModal] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    const getHandleGenVoice = async () => {
        setIsLoading(true);
        setOpenModal(false);
        try {
            if (Object.keys(locRealAdd.getCurrRealAddress).length < 1) {
                return;
            };

            jsonData.destLocAddress = locRealAdd.getCurrRealAddress.formattedAddress;
            jsonData.destCoordinates = `Lat: ${coordsAddState.lat}, Long: ${coordsAddState.lng}`;

            const getAuth0Tok = await getAccessTokenSilently();

            // encrypt data before sending it to the database
            const encryptData = getEncryptedData(jsonData);

            console.log("resp before AI", encryptData);

            const getResp = await axios.post(`${getBaseApi}/generate-ai-voice`, encryptData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuth0Tok}`
                }
            });

            console.log("resp from AI", getResp);
            

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
    }, [getCurrLoc]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        }
    }, []);

    useEffect(() => {
        if (getAudioSource && audioRef.current) {
            audioRef.current.play();
            handlePlayPause();
        }
    }, [getAudioSource]);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (isPlaying) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;

                const scrollSpeed = 10;
                setScrollPosition((prev) => prev + scrollSpeed);

                if (currentTime >= duration) {
                    setIsPlaying(false);
                    clearInterval(scrollInterval);
                }
            }
        }, 100);

        return () => clearInterval(scrollInterval);
    }, [isPlaying]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {

                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const modalToggle = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className='text-btn-style'>
                {getAudioSource ? (
                    <div className='d-flex text-btn-style'>
                        {getAiText && (
                            <div className='text-style'>
                                {/* <div
                                    ref={textRef}
                                    className="text-scroll"
                                    style={{
                                        position: 'absolute',
                                        transform: `translateY(-${scrollPosition}px)`,
                                        transition: 'transform 0.1s linear',
                                    }}
                                > */}
                                {String(getAiText)}
                                {/* </div> */}
                            </div>
                        )}

                        {/* <VoiceIndicator /> */}
                        <button onClick={handlePlayPause} className='play-button'>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ marginRight: '8px' }} />
                            {/* {isPlaying ? 'Stop' : 'Play'} */}
                            {getIsLoading ? (
                                <span>Please wait...</span>
                            ) : (
                                isPlaying ? 'Stop' : 'Play'
                            )}
                        </button>

                        {/* <audio ref={audioRef} controls>
                            <source src={getAudioSource} type="audio/mpeg" />
                            Your browser does not support the audio tag.
                        </audio> */}
                        <audio ref={audioRef} src={getAudioSource} />
                    </div>
                ) : (
                    <>
                        <button onClick={modalToggle} className='button-gen' disabled={getIsLoading}>
                            <img src={speakIcon} style={{ marginRight: '5px' }} />
                            {getIsLoading ? 'Please wait...' : 'AI Suggest'}
                        </button>
                        {/* <button onClick={getHandleGenVoice} disabled={getIsLoading} className='button-gen'>
                            <img src={speakIcon} style={{ marginRight: '5px' }} />
                            {getIsLoading ? 'Please wait...' : 'AI Suggest'}
                        </button> */}
                    </>
                )}

                {openIsModal && (
                    // <div className='modal-overlay'>
                    //     <div className='modal-content'>
                    //         <h2>Modal Title</h2>
                    //         <p>This is a simple modal popup.</p>
                    //         <button onClick={getHandleGenVoice} disabled={getIsLoading} className='button-gen'>
                    //             <img src={speakIcon} style={{ marginRight: '5px' }} />
                    //             {getIsLoading ? 'Please wait...' : 'Continue'}
                    //         </button>
                    //     </div>
                    // </div>
                    <div className="modal show d-flex align-items-center justify-content-center vh-100" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">AI-Generated Content Disclaimer</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>The parking recommendations you receive by using the AI Suggestions feature are generated by artificial intelligence to help you find nearby parking spots. Please note that these suggestions may not always be accurate. While we strive for high-quality and helpful results, consider these suggestions as a guide and use your discretion when selecting a parking spot.</p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={getHandleGenVoice} disabled={getIsLoading} className='btn btn-secondary'>
                                        <img src={speakIcon} style={{ marginRight: '5px' }} />
                                        {getIsLoading ? 'Please wait...' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Overlay */}
                {openIsModal && <div className="modal-backdrop fade show" ></div>}

            </div>
        </>
    );
}

export default AISuggestion