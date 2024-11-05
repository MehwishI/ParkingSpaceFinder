import MapContainer from 'components/MapContainer/MapContainer';
import React, { useEffect, useState } from 'react';
import './MapNavigation.css';
import turnLeft from '../../images/turn_left.png';
import { useLocation } from "react-router";

const center = {
    lat: 49.797410,
    lng: -97.165825
}

const destination = {
    lat: 49.929878,
    lng: -97.167346
}

const MapNavigation = () => {
    const [currentPos, setCurrentPos] = useState(null);
    const [path, setPath] = useState([]);
    const location = useLocation();
    const [durationData, getDurationData] = useState('');
    const [distancenData, getDistanceData] = useState('');

    useEffect(() => {
        const { duration, distance } = location.state || {};

        getDurationData(duration);
        getDistanceData(distance);

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setCurrentPos(newPos);
                setPath((prevPath) => [...prevPath, newPos]);
            },
            (error) => console.log(error),
            { enableHighAccuracy: true }

        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, [])

    const getAllLocsCoord = () => {
    };

    return (
        <>
            <div className='upper-third-style d-flex'>
                <img src={turnLeft} height={'48px'}  width={'48px'}/>
                <div className='up-div-style'>Woodhaven Blvd</div>
            </div>
            <div style={{ height: '100vh' }}>
                <MapContainer
                    wpaResData={{}}
                    aiSugData={{}}
                    onDataChange={getAllLocsCoord}
                    getAllLocsData={null}
                    currPosition={currentPos}
                    path={path}
                    destCoorNav={destination}
                />
            </div>
            <div className='lower-third-style'>
                <div className='d-flex justify-content-between'>
                    <div className='upper-text'>{durationData}</div>
                    <button className='btn-style'>Exit</button>
                </div>
                <div className='lower-text'>
                    {distancenData} - Expected Arrival 10:13 AM
                </div>
            </div>
        </>
    )
}

export default MapNavigation