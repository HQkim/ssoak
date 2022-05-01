import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = "http://k6a207.p.ssafy.io:5000/api/v1";
const accessToken = AsyncStorage.getItem("accessToken");

export const instance: AxiosInstance = axios.create({
  baseURL: `${BaseURL}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
