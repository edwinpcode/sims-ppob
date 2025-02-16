import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BalanceState = {
  value: Number;
};

const initialState: BalanceState = {
  value: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<Number>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBalance } = balanceSlice.actions;

export const balanceReducer = balanceSlice.reducer;
