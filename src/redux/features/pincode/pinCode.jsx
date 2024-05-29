// pinCodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pinCodeSlice = createSlice({
  name: 'pinCode',
  initialState: {
    pinCodes: [], // Ensure this is initialized
  },
  reducers: {
    addPinCode: (state, action) => {
      state.pinCodes.push(action.payload);
    },
    removePinCode: (state, action) => {
      state.pinCodes = state.pinCodes.filter(pinCode => pinCode !== action.payload);
    },
  },
});

export const { addPinCode, removePinCode } = pinCodeSlice.actions;
export default pinCodeSlice.reducer;
