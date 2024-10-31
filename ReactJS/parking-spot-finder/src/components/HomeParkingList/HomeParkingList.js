import React, { useEffect, useState } from 'react';
import "./HomeParkingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { MdOutlineTurnRight } from "react-icons/md";
import { locResultForCoord } from 'services/locationResultService';
import iconmarker from "../../images/marker-pinlet.png";
import iconturnright from "../../images/turnright.png";
import iconAiSuggest from "../../images/ant-design_sound-filled.png";

const isProd = process.env.REACT_APP_ISPROD;

const HomeParkingList = ({ getAllParkList, getCurrLocAdd }) => {
    const [wpaFetchData, setWpaData] = useState([]);
    const [fetchCoords, setCoords] = useState();
    const navigate = useNavigate();

    const buildCoords = {};

    useEffect(() => {
        try {
            getLocCoordinates();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getLocCoordinates = async () => {
        let coords;

        // Remove before deployment
        if (isProd === "false" || false) {
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

        navigate('/mapdirection', { state: { coords: buildCoords, currCoords: getCurrLocAdd, allItems: item } });
    };

    const getAiSuggest = () => {
        navigate('/locationresult', {
            state: {
              addressCoordinate: { getCurrLocAdd },
              searchInput: { },
            },
          });
    };

    return (
        <div className='home-list-style'>
            {wpaFetchData.length > 0 ? (
                wpaFetchData.map((item, index) => (
                    <div key={item.id} className='list-style'>
                        <div className='row'>
                            <div className='col-sm-3 d-flex align-items-center'>
                                <div>
                                    <span className='list-number'>{index + 1}</span>
                                    <img src={iconmarker} alt="icon" />
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
                                                <div className='space-small'>{item.total_space} spaces</div>
                                            </div>
                                        </div>
                                        <div className='btn-div-style'>
                                            <img src={iconturnright} onClick={() => getHandleClick(item)} alt="Turn icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <div className='ai-section-style'>No Data Available</div>
                    <button className='custom-btn-two' onClick={getAiSuggest}>
                        <img src={iconAiSuggest} className='btn-ai-style' alt="AI Suggest" />
                        AI Suggest
                    </button>
                </div>
            )}
        </div>
    );
}

export default HomeParkingList;