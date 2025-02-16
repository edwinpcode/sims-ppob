import axios, { AxiosError, AxiosResponse } from "axios";
import ModelResponse from "src/model/ModelRespone";

export const apiPublic = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  headers: {
    Accept: "application/json",
  },
});

export const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

apiPublic.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiPublic.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log("Response : ", res.data);
    return res;
  },
  (error: AxiosError<ModelResponse>) => {
    if (error.response) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default apiPublic;
