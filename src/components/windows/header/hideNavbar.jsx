import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Hidenavbar({ children }) {
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        if (location.pathname.includes('/retailer')||location.pathname === '/login' || location.pathname === '/signup') {
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

export default Hidenavbar;
