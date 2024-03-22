import { configureStore } from "@reduxjs/toolkit";
import scanReducer from "../features/scan/scanSlice";

const store = configureStore({
  reducer: {
    scan: scanReducer,
  },
});

export default store;
