import { createSlice } from "@reduxjs/toolkit";

export const scanSlice = createSlice({
  name: "scan",
  initialState: {
    data: {},
  },
  reducers: {
    updateScanData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateScanData } = scanSlice.actions;

export default scanSlice.reducer;
