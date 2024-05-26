import React, { memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRouteWrapper = memo(({ element }) => {
  const location = useLocation();
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  return storedUserData 
    ? element 
    : <Navigate to="/login" state={{ from: location.pathname }} />;
});

export default AuthRouteWrapper;

