import React, { memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RetailerAuthRouteWrapper = memo(({ element }) => {
  const location = useLocation();
  const storedUserData = localStorage.getItem('retailerData');

  return storedUserData
    ? element
    : <Navigate to="/retailer/login" state={{ from: location.pathname }} />;
});

export default RetailerAuthRouteWrapper;
