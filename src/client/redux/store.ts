import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import jobSlice from "./slices/jobSlice";

export const store = configureStore({
  reducer: {
    site: jobSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
