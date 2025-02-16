import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoadinState = {
  isLoading: boolean;
};

const initialState: LoadinState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
