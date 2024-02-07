import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeshowNavbar = ({ children }) => {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/form') {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, [location]);

    return (
        <div>
            {showNavbar && children}
        </div>
    );
}

export default MaybeshowNavbar;