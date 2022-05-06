import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = "http://k6a207.p.ssafy.io:5000/api/v1";

export const instance: AxiosInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjUzNTMwMzkyfQ.MtzbBjQmlU1najLsVwxTbUmFPD3aOPv0MhUDTKoC5RvZ2HuLooClTgrQdqfo0uNDgXk6m4yUAqsXpWzjGmrCkQ`,
    "Content-type": "application/json",
  },
});

export const setApiHeaders = async () => {};
instance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("accessToken");
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjUzNTMwMzkyfQ.MtzbBjQmlU1najLsVwxTbUmFPD3aOPv0MhUDTKoC5RvZ2HuLooClTgrQdqfo0uNDgXk6m4yUAqsXpWzjGmrCkQ`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export const fileInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

fileInstance.interceptors.request.use(
  async (config: any) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjUzNTMwMzkyfQ.MtzbBjQmlU1najLsVwxTbUmFPD3aOPv0MhUDTKoC5RvZ2HuLooClTgrQdqfo0uNDgXk6m4yUAqsXpWzjGmrCkQ`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
