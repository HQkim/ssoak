import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = "https://k6a207.p.ssafy.io/api/v1";

export const instance: AxiosInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    // Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}`,
    "Content-type": "application/json",
  },
});
export const fileInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}`,
  },
});

export const noHeaderInstance = axios.create({
  baseURL: `${BaseURL}`,
});

instance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
fileInstance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

noHeaderInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log(token, "..");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
