import React, { useEffect, useState } from 'react';
import MapContainer from 'components/MapContainer/MapContainer';
import './MapNavigation.css';
import turnLeft from '../../images/turn_left.png';
import { useLocation } from "react-router";

const center = {
    lat: 49.797410,
    lng: -97.165825
};

const destination = {
    lat: 49.929878,
    lng: -97.167346
};

const MapNavigation = () => {
    const [currentPos, setCurrentPos] = useState(null);
    const [directions, setDirections] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const location = useLocation();
    const [durationData, setDurationData] = useState('');
    const [distancenData, setDistanceData] = useState('');
    const [remainingTime, setRemainingTime] = useState(null);
    const [targetTime, setTargetTime] = useState(null);

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    useEffect(() => {
        const { duration, distance } = location.state || {};
        setDurationData(duration);
        setDistanceData(distance);

        if (duration) {
            const newDuration = parseInt(duration.replace(/(mins|min|s)/g, ''), 10);
            if (!isNaN(newDuration)) {
                setRemainingTime(newDuration * 60);
            }
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setCurrentPos(newPos);
            },
            (error) => console.log(error),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [location.state]);

    useEffect(() => {
        if (!remainingTime) return;

        const arrivalTime = new Date(Date.now() + remainingTime * 1000);
        setTargetTime(arrivalTime);

        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [remainingTime]);

    useEffect(() => {
        if (currentPos) {
            const request = {
                origin: currentPos,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                    directionsRenderer.setDirections(result);
                } else {
                    console.log("Error fetching directions:", status);
                }
            });
        }
    }, [currentPos]);

    const handleStepProgress = () => {
        if (!directions) return;

        const currentStep = directions.routes[0].legs[0].steps[currentStepIndex];
        const currentStepLocation = currentStep.end_location;

        const distanceToStep = window.google.maps.geometry.spherical.computeDistanceBetween(
            currentPos,
            currentStepLocation
        );

        if (distanceToStep < 50) {
            setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, directions.routes[0].legs[0].steps.length - 1));
        }
    };

    useEffect(() => {
        if (currentPos) {
            handleStepProgress();
        }
    }, [currentPos]);

    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    const formatDuration = (date) => {
        if (!date) return 'Calculating time...';
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    return (
        <>
            <div className='upper-third-style d-flex'>
                {directions && (
                    <>
                        <img src={turnLeft} alt="Turn Arrow" height="30px" width="30px" />
                        <div className="up-div-style">
                            {stripHtmlTags(directions.routes[0].legs[0].steps[currentStepIndex].instructions)}
                        </div>
                    </>
                )}
            </div>
            <div style={{ height: '100vh' }}>
                <MapContainer
                    wpaResData={{}}
                    aiSugData={{}}
                    onDataChange={() => { }}
                    getAllLocsData={null}
                    currPosition={center}
                    path={[]}
                    destCoorNav={destination}
                    directionsRenderer={directionsRenderer}
                />
            </div>
            <div className='lower-third-style'>
                <div className='d-flex justify-content-between'>
                    <div className='upper-text'>{durationData}</div>
                    <button className='btn-style'>Exit</button>
                </div>
                <div className='lower-text'>
                    {distancenData} - Expected Arrival {targetTime ? formatDuration(targetTime) : 'Calculating time...'}
                </div>
            </div>
        </>
    );
};

export default MapNavigation;
