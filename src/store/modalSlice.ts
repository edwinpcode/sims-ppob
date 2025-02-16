import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  message?: string;
  title?: string;
  info?: string;
  type: "success" | "failed" | "warning" | "info";
}

export interface CounterState extends Data {
  show: boolean;
}

const initialState: CounterState = {
  type: "info",
  message: "",
  title: "",
  info: "",
  show: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalShow: (state, action) => {
      state.show = action.payload;
    },
    setModalData: (state, action: PayloadAction<Data>) => {
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.info = action.payload.info;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalShow, setModalData } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
