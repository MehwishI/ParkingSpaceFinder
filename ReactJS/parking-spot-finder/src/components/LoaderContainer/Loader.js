import React from 'react';
import './Loader.css';
import logo from "../../images/logo-white.png";

const Loader = () => {
    return (
        <div className='logo-load'>
            <div className='logo-contain'>
                <img
                    src={logo}
                    alt="SmartPark Logo"
                    className="shine-logo"
                />
            </div>
        </div>
    );
};

export default Loader;