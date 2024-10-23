import React, { useEffect, useState } from 'react';
import "./HomeParkingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { MdOutlineTurnRight } from "react-icons/md";
import { locResultForCoord } from 'services/locationResultService';

const isProd = process.env.REACT_APP_ISPROD;

const HomeParkingList = ({ getAllParkList, getCurrLocAdd }) => {
    const [wpaFetchData, setWpaData] = useState([]);
    const [fetchCoords, setCoords] = useState();
    const navigate = useNavigate();

    const buildCoords = {

    };

    useEffect(() => {
        try {
            getLocCoordinates();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getLocCoordinates = async () => {
        let coords;
        
        // remove before deployment
        if (isProd === "false") {
            coords = {
                lat: 49.8912767,
                lng: -97.1392939
            };

            setCoords(coords);
        } else {
            coords = getCurrLocAdd;
            setCoords(coords);
        };

        const getData = await locResultForCoord(coords);
        setWpaData(getData);

        getAllParkList(getData);
    };

    const getHandleClick = (item) => {
        buildCoords.lat = item.location.latitude;
        buildCoords.lng = item.location.longitude;

        navigate('/mapdirection', { state: { coords: buildCoords, currCoords: getCurrLocAdd } });
    }

    return (
        <div className='home-list-style'>
            {wpaFetchData.length > 0 && (
                wpaFetchData.map((item, index) => (
                    <div key={item.id} className='list-style'>
                        <div className='row'>
                            <div className='col-sm-3 d-flex align-items-center'>
                                <div>
                                    <span className='list-number'>{index + 1}</span>
                                    <FontAwesomeIcon icon={faMapMarker} className='marker-style' color="#129F4E" />
                                </div>
                                <div className='ms-2'>
                                    <div className='d-flex align-items-center side-containers'>
                                        <div>
                                            <div className='overlay-text-top'>
                                                <b>{item.street}</b>
                                            </div>
                                            <div className='overlay-text-bottom'>
                                                {item.time_limit}
                                            </div>
                                            <div className='d-flex lower-info-boxes'>
                                                <div className='address-small'>PN: {item.paystation_number}</div>
                                                <div className='price-small'>{item.hourly_rate}$/hr</div>
                                                <div className='space-small'>{item.total_space} total spaces</div>
                                            </div>
                                        </div>
                                        <div className='btn-div-style'>
                                            <MdOutlineTurnRight onClick={() => getHandleClick(item)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        // <div className='home-list-style'>
        //         <div className='list-style'>
        //             <div className='row'>
        //                 <div className='col-sm-3 d-flex align-items-center'>
        //                     <div>
        //                         <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#000000" />
        //                     </div>
        //                     <div className='ms-2'>
        //                         <div className='d-flex align-items-center side-containers'>
        //                             <div>
        //                                 <div className='overlay-text-top'>
        //                                     <b>Test Street</b>
        //                                 </div>
        //                                 <div className='overlay-text-bottom'>
        //                                     HomeParkingList
        //                                 </div>
        //                                 <div className='d-flex lower-info-boxes'>
        //                                     <div className='address-small'>Hours</div>
        //                                     <div className='price-small'>15$/hr</div>
        //                                     <div className='space-small'>Hours</div>
        //                                 </div>
        //                             </div>
        //                             <div className='btn-div-style'>
        //                                 <MdOutlineTurnRight onClick={getHandleClick} />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // </div>
    )
}

export default HomeParkingList