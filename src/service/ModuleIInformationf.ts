import { BannerRespone } from "src/model/information/Banner";
import apiPublic from "./ApiPublic";
import { ServiceRespone } from "src/model/information/Services";

export const getBanner = () => {
  return apiPublic.get<BannerRespone>("/banner");
};

export const getServices = () => {
  return apiPublic.get<ServiceRespone>("/services");
};
