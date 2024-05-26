import { configureStore } from '@reduxjs/toolkit';
import setIsAuthenticated from "../features/logInLogout/authenticationSlice.jsx";
import setUser from "../features/userData/userDataSlice.jsx";
import productReducer from "../features/products/productSlics.jsx";
import retailerSlice from "../features/retailer/retailerSlice.jsx";
import shopSlice from "../features/shop/shopSlice.jsx";

const store = configureStore({
    reducer: {
        Authentication: setIsAuthenticated,
        user: setUser,
        products: productReducer,
        retailer: retailerSlice,
        shop: shopSlice
    },
    // Additional configuration options can be added here if needed
});

export default store;

