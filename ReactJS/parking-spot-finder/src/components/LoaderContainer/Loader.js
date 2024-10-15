import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Loader.css';
import { useAuth0 } from '@auth0/auth0-react';
// import logo from './samplelogo.png';

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            if (isAuthenticated) {
                navigate('/home');
            } else {
                navigate('/home');
                // navigate('/login');
            }
        }, 3000);
    }, [navigate]);

    return (
        <div className='logo-load'>
            {loading && (
                <div className='logo-contain'>
                    <img
                        // src={logo}
                        src=''
                        alt="SmartPark Logo"
                        className="shine-logo"
                    />
                    {/* <div className="shine-effect"></div> */}
                </div>
            )}
        </div>
    );
};

export default Loader;