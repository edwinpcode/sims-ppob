import { Login, LoginResponse } from "src/model/membership/Login";
import apiPublic, { formDataConfig } from "./ApiPublic";
import {
  Registration,
  RegistrationResponse,
} from "src/model/membership/Registration";
import {
  ProfileUpdate,
  ProfileUpdateResponse,
} from "src/model/membership/ProfileUpdate";
import { ProfileResponse } from "src/model/membership/Profile";
import { ProfileImageResponse } from "src/model/membership/ProfileImage";

export const postRegistration = (data: Registration) => {
  return apiPublic.post<RegistrationResponse>("/registration", data);
};

export const postLogin = (data: Login) => {
  return apiPublic.post<LoginResponse>("/login", data);
};

export const getProfile = () => {
  return apiPublic.get<ProfileResponse>("/profile");
};

export const putProfile = (data: ProfileUpdate) => {
  return apiPublic.put<ProfileUpdateResponse>("/profile/update", data);
};

export const putProfileImage = (data: FormData) => {
  return apiPublic.put<ProfileImageResponse>(
    "/profile/image",
    data,
    formDataConfig
  );
};
