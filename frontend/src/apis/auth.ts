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

export const kakaoProfile = async (access_Token: string) => {
  const response = await instance.get("/members/profile", {
    headers: {
      Authorization: `Bearer ${access_Token}`,
    },
  });
  if (response.data.statusCode === 200) {
    return response.data;
  } else if (response.data.statusCode === 401) {
    console.warn("회원 권한 없음");
  } else if (response.data.statusCode === 500) {
    console.warn("내부 서버 에러");
  }
};
