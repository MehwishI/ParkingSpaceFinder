import MapContainer from 'components/MapContainer/MapContainer';
import React from 'react';
import './MapNavigation.css';

const MapNavigation = () => {
    const getAllLocsCoord = () => {
    };

    return (
        <>
            <div style={{ height: '100vh' }}>
                <MapContainer
                    wpaResData={{}}
                    aiSugData={{}}
                    onDataChange={getAllLocsCoord}
                    getAllLocsData={null}
                />
            </div>
            <div className='lower-third-style'>
                <div>Polo Park exit</div>
                <button>Exit</button>
            </div>
        </>
    )
}

export default MapNavigation