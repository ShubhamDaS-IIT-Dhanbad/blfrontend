import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.jsx';

// Define initial state
const initialState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  },
};

// Create store with rootReducer and initial state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
