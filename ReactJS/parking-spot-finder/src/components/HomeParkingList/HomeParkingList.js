import React from 'react';
import "./HomeParkingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { MdOutlineTurnRight } from "react-icons/md";

const HomeParkingList = () => {
    const navigate = useNavigate();

    const getHandleClick = () => {
        navigate('/mapdirection');
    }

    return (
        <>
            <div className='list-style'>
                <div className='row'>
                    <div className='col-sm-3 d-flex align-items-center'>
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#000000" />
                        </div>
                        <div className='ms-2'>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <div className='overlay-text-top'>
                                        <b>Polo Park, Winnipeg. MB</b>
                                    </div>
                                    <div className='overlay-text-bottom'>
                                        HomeParkingList
                                    </div>

                                </div>
                                <div className='btn-div-style'>
                                    <MdOutlineTurnRight onClick={getHandleClick}/>
                                    {/* <button className='btn-style-one' onClick={getHandleClick}>Get Direction</button> */}
                                </div>
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
                            <div className='d-flex align-items-center'>
                                <div>
                                    <div className='overlay-text-top'>
                                        <b>Polo Park, Winnipeg. MB</b>
                                    </div>
                                    <div className='overlay-text-bottom'>
                                        HomeParkingList
                                    </div>

                                </div>
                                <div className='btn-div-style'>
                                    <MdOutlineTurnRight onClick={getHandleClick}/>
                                    {/* <button className='btn-style-one' onClick={getHandleClick}>Get Direction</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeParkingList