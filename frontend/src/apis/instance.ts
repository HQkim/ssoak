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

export const setApiHeaders = async () => {
  instance.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem("accessToken");
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  fileInstance.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem("accessToken");
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export const fileInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}`,
  },
});
