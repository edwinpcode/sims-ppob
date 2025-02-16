import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "src/model/membership/Profile";

const initialState: Profile = {
  first_name: "",
  last_name: "",
  email: "",
  profile_image: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile>) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.profile_image = action.payload.profile_image;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileData } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
