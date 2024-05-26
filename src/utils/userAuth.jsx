import { useState, useEffect } from 'react';

// Custom hook to check if the user is logged in
function useAuthentication() {
    // e.preventDefault();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Function to check if the user is logged in
        const checkLoggedIn = () => {
            // Retrieve the authentication token from localStorage or sessionStorage
            const token = localStorage.getItem('token'); // You may also use sessionStorage
// alert(token)
            // Check if the token exists and is not expired
            setIsLoggedIn(!!token); // If token exists and is not expired, set isLoggedIn to true; otherwise, set it to false
        };

        // Call checkLoggedIn initially when the component mounts
        checkLoggedIn();

        // Use setInterval to periodically check the user's authentication status
        const intervalId = setInterval(checkLoggedIn, 60000); // Check every 60 seconds (adjust as needed)

        // Clean up by clearing the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return isLoggedIn;
}

export default useAuthentication;
