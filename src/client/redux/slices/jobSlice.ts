import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SiteState {
  title: string;
  description: string;
  // Add more properties as needed;
  prop2?: string;
}

const initialState: SiteState = {
  title: "",
  description: "",
  prop2: "",
};

const jobSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    test(state, action: PayloadAction<string>) {
      state.title = action.payload;
      state.description = "description";
    },
  },
});

export const { test } = jobSlice.actions;
export default jobSlice;
