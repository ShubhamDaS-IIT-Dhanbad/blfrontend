import dotenv from 'dotenv';
import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from './redux/features/logInLogout/authenticationSlice.jsx';
import { setUser } from './redux/features/userData/userDataSlice.jsx';
import Windows from './windowsApp.jsx';
import "./App.css";


const initializeApp = async (dispatch) => {
  try {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    
    if (userData) {
      dispatch(setUser(userData));
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

const App = React.memo(() => {
  const dispatch = useDispatch();

  const initApp = useCallback(() => {
    initializeApp(dispatch);
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);
  return <Windows />;
});

export default App;
