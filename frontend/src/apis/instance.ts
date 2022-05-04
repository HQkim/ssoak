import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = "http://k6a207.p.ssafy.io:5000/api/v1";

export const instance: AxiosInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}`,
    "Content-type": "application/json",
  },
});

// export const setApiHeaders = () => {
instance.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] = `Bearer ${AsyncStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// };
