import React from 'react';
import "./HomeParkingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const HomeParkingList = () => {
    return (
        <>
            <div className='list-style'>
                <div className='row'>
                    <div className='col-sm-3 d-flex align-items-center'>
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#000000" />
                        </div>
                        <div className='ms-2'>
                            <div className='overlay-text-top'>
                                <b>Polo Park, Winnipeg. MB</b>
                            </div>
                            <div className='overlay-text-bottom'>
                                HomeParkingList
                            </div>
                            <div className='btn-div-style'>
                                <button className='btn-style-one'>Get Direction</button>
                                <button className='btn-style-one'>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='list-style'>
                <div className='row'>
                    <div className='col-sm-3 d-flex align-items-center'>
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#000000" />
                        </div>
                        <div className='ms-2'>
                            <div className='overlay-text-top'>
                                <b>Polo Park, Winnipeg. MB</b>
                            </div>
                            <div className='overlay-text-bottom'>
                                HomeParkingList
                            </div>
                            <div className='btn-div-style'>
                                <button className='btn-style-one'>Get Direction</button>
                                <button className='btn-style-one'>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeParkingList