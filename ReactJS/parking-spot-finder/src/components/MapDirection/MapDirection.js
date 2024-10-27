import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import MapContainer from 'components/MapContainer/MapContainer';
import "./MapDirection.css";
import iconturnright from '../../images/turn_right.png';
import Search from 'components/Search/Search';

const MapDirection = () => {
    const getLocation = useLocation();
    const { coords, currCoords } = getLocation.state || {};

    const destCoord = {};
    const currentCoords = {};
    const [distance, setDistance] = useState('');

    useEffect(() => {
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

    const getDurationTime = (resData) => {
        console.log("jayMike",resData);
        
        setDistance(resData);
    };

    return (
        <>
            {/* <div>
                <Search />
            </div> */}
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
                        <label className='minute-label'>8 min</label> ({distance})
                    </div>
                    <div className='price-div'>12/hour</div>
                </div>

                <div className='list-info-style'>
                    <ul>
                        <li>Permit-only for residents from 6:00 PM to 6:00 AM; open to public during regular hours</li>
                        <li>2-hour maximum for all vehicles</li>
                        <li>Accessible parking spaces near the entrance with ramp access</li>
                        <li>Electric vehicle charging stations available</li>
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

export default MapDirection