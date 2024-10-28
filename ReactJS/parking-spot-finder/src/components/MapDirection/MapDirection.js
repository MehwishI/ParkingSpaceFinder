import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import MapContainer from 'components/MapContainer/MapContainer';
import "./MapDirection.css";
import iconturnright from '../../images/turn_right.png';
import Search from 'components/Search/Search';

const MapDirection = () => {
    const getLocation = useLocation();
    const { coords, currCoords, allItems } = getLocation.state || {};

    const destCoord = {};
    const currentCoords = {};
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        console.log("coords points", allItems);

        // build destination coordinates
        destCoord.lat = parseFloat(coords.lat);
        destCoord.lng = parseFloat(coords.lng);

        // build current coordinates
        currentCoords.lat = parseFloat(currCoords.lat);
        currentCoords.lng = parseFloat(currCoords.lng);
    }, []);

    const getCurrentLocCoords = (resData) => {
        // setDistance(resData);
    };

    const getDurationTime = (resDataDistance, resDataDuration) => {
        setDistance(resDataDistance);
        setDuration(resDataDuration);
    };

    return (
        <>
            <Search backgroundColor={'none'} marginLeft={'10px'}/>
            <div className='map-container'>
                <MapContainer
                    wpaResData={{}}
                    aiSugData={{}}
                    onDataChange={getCurrentLocCoords}
                    getAllLocsData={null}
                    directionCoords={destCoord}
                    curCoords={currentCoords}
                    onDurationTime={getDurationTime}
                />
                {/* <div>Destination Coordinates {coords.lat}</div>
            <div>Current Coordinates {currCoords.lat}</div> */}
            </div>
            <div className='direction-info'>
                <hr className='hr-style'></hr>
                <div className='d-flex justify-content-between'>
                    <div className='top-left-text'>
                        <label className='minute-label'>{duration}</label> ({distance})
                    </div>
                    <div className='price-div'>{allItems.hourly_rate}/hour</div>
                </div>

                <div className='list-info-style'>
                    <ul>
                        <li>Location: <span className='data-style'>{allItems.street}</span></li>
                        <li>Restriction: <span className='data-style'>{allItems.restriction}</span></li>
                        <li>Time Limit: <span className='data-style'>{allItems.time_limit}</span></li>
                        <li>Total Spaces: <span className='data-style'>{allItems.total_space}</span></li>
                        <li>Accessible Spaces: <span className='data-style'>{allItems.accessible_space}</span></li>
                        <li>Payment Options: <span className='data-style'>Mobile pay available (Zone {allItems.mobile_pay_zone})</span></li>
                    </ul>
                </div>

                <button className='custom-btn'>
                    <img src={iconturnright} className='btn-icon-style'></img>
                    Start
                </button>
            </div>
        </>
    )
}

export default MapDirection;
