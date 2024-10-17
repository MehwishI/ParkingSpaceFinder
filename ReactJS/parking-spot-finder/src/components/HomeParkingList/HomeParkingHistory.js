import React from 'react';
import "./HomeParkingHistory.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const HomeParkingHistory = () => {
    return (
        <div className='park-hist-style'>
            <div className='row'>
                <div className='col-sm-3 d-flex align-items-center out-gen-style'>
                    <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#000000" />
                    <div className='text-style'>
                        <div className='text-top'>
                            <b>Home Parking History</b>
                        </div>
                        <div className='text-bottom'>
                            Home Parking History Text
                        </div>
                    </div>
                </div>
                <hr className='line-style'></hr>
                <div className='col-sm-3 d-flex align-items-center out-gen-style'>
                    <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#000000" />
                    <div className='text-style'>
                        <div className='text-top'>
                            <b>Home Parking History</b>
                        </div>
                        <div className='text-bottom'>
                            Home Parking History Text
                        </div>
                    </div>
                </div>
                <hr className='line-style'></hr>
            </div>
        </div>
    )
}

export default HomeParkingHistory