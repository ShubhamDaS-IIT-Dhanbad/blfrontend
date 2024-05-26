import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null, // Updated initial state to null
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      try {
        const data = localStorage.getItem('userData');
        if (data) {
          state.userData = JSON.parse(data); // Parse JSON data from localStorage
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      } catch (error) {
        console.error('Error while setting user data:', error);
        // Handle error gracefully, if needed
      }
    },
    clearUser(state) {
      try {
        localStorage.removeItem('userData'); // Clear user data from localStorage
        state.userData = null; // Reset userData
        state.isAuthenticated = false;
      } catch (error) {
        console.error('Error while clearing user data:', error);
        // Handle error gracefully, if needed
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
