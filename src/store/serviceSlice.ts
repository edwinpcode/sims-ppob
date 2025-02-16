import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "src/model/information/Services";

export interface PaymentState {
  label: string;
  icon: string;
}

const initialState: Service = {
  service_code: "",
  service_icon: "",
  service_name: "",
  service_tariff: 0,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Service>) => {
      state.service_code = action.payload.service_code;
      state.service_icon = action.payload.service_icon;
      state.service_name = action.payload.service_name;
      state.service_tariff = action.payload.service_tariff;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setService } = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
