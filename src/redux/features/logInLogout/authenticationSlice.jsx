import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('userData'),
};
export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = !!localStorage.getItem('userData');
    },
  },
});
export const { setIsAuthenticated } = authenticationSlice.actions;
export default authenticationSlice.reducer;

