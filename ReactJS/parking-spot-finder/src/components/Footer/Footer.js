import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <>
        <div className='footer'>
            <div className='footer-item'>
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </div>
            <div className='footer-item'>
                <FontAwesomeIcon icon={faList} />
                <span>History</span>
            </div>
            <div className='footer-item'>
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
            </div>
        </div>
        </>
    )
}

export default Footer