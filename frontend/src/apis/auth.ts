import { instance } from "./instance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const kakaoLogin = async (access_code: string) => {
  const response = await instance.post("/members/login/kakao", {
    code: access_code,
  });
  if (response.data.statusCode === 200) {
    AsyncStorage.setItem("accessToken", response.data.data.accessToken);
  }
  return response.data;
};
