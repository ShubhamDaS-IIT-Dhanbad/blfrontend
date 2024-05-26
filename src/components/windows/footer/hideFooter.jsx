import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function HideFooter({ children }) {
    const location = useLocation();
    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup'||location.pathname.includes('/retailer')) {
            setShowFooter(false);
        } else {
            setShowFooter(true);
        }
    }, [location]);

    return (
        <div>
            {showFooter && children}
        </div>
    );
}

export default HideFooter;
